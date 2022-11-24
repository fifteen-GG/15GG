from http.client import HTTPException
from app.crud.base import CRUDBase
from app.models.match import Match
from app.schemas.match import MatchCreate, MatchUpdate
from sqlalchemy.orm import Session


class CrudMatch(CRUDBase[Match, MatchCreate, MatchUpdate]):
    # Declare model specific CRUD operation methods.
    def get_match_info(self, db: Session, match_id: str):
        try:
            match_info = db.query(self.model).filter(
                self.model.id == match_id).one()
            return match_info
        except:
            raise Exception

    def create_match(self, db: Session, match_info):
        match_data = Match(
            id=match_info['match_id'],
            queue_mode=match_info['queue_mode'],
            game_duration=match_info['game_duration'],
            created_at=match_info['created_at'])
        try:
            db.add(match_data)
            db.commit()
        except Exception as e:
            db.rollback()
            raise Exception
        return

    def get_analyzing_match(self, db: Session):
        analyzing_match_list = db.query(self.model).filter(
            self.model.status == 1).all()
        return analyzing_match_list

    def update_match_status(self, db: Session, match_id: str, status: int):
        current_status = db.query(self.model).filter(
            self.model.id == match_id).one().status
        if status - current_status != 1:
            raise Exception
        db.query(self.model).filter(self.model.id ==
                                    match_id).update({'status': status}, synchronize_session=False)
        db.commit()


match = CrudMatch(Match)
