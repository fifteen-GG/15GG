from http.client import HTTPException
from multiprocessing.sharedctypes import Value
from app.crud.base import CRUDBase
from app.models.match import Match
from app.schemas.match import MatchCreate, MatchUpdate
from sqlalchemy.orm import Session
from app.api.v1.riot_api import get_match_data, create_match_data_list
import httpx


class CrudMatch(CRUDBase[Match, MatchCreate, MatchUpdate]):
    # Declare model specific CRUD operation methods.
    def get_match_info(self, db: Session, match_id: str):
        try:
            match_info = db.query(self.model).filter(
                self.model.id == match_id).one()
            return match_info
        except Exception as e:
            raise Exception

    def create_match(self, db: Session, match_info):
        match_data = Match(
            id=match_info['match_id'],
            queue_mode=match_info['queue_mode'],
            game_duration=match_info['game_duration'],
            created_at=match_info['created_at'],
            status=match_info['status']
        ),
        try:
            db.add(match_data[0])
            db.commit()
        except Exception as e:
            print(e)
            db.rollback()
            raise Exception
        return

    def get_analyzing_match(self, db: Session):
        analyzing_match_list = db.query(self.model).filter(
            self.model.status == 1).all()
        return analyzing_match_list

    async def update_match_status(self, db: Session, match_id: str, status: int):
        async with httpx.AsyncClient() as client:
            try:
                current_status = db.query(self.model).filter(
                    self.model.id == match_id).one().status
            except:
                match_data = await get_match_data(match_id, client)
                await create_match_data_list(db, match_data, None)
                current_status = 0
            if current_status == 2:
                raise ValueError("Match is already analyzed")

            if status - current_status != 1:
                raise ValueError("Unable to update the status of match")
            db.query(self.model).filter(self.model.id ==
                                        match_id).update({'status': status}, synchronize_session=False)
            db.commit()


match = CrudMatch(Match)
