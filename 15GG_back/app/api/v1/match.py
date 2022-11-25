from datetime import datetime, timedelta
from http.client import HTTPException

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import schemas, crud
from app.api.deps import get_db

import httpx

from pydantic import BaseModel
router = APIRouter()


class UpdateStatusValue(BaseModel):
    match_id: str
    status: int


@router.get('/analyzing')
def get_analyzing_match(*, db: Session = Depends(get_db)):
    analyzing_match_list = crud.match.get_analyzing_match(db)

    return analyzing_match_list


@router.post('/update/status')
def update_match_status(*, db: Session = Depends(get_db), value: UpdateStatusValue):
    crud.match.update_match_status(db, value.match_id, value.status)
