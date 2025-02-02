from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import os

# Definition of the database interface
DATABASE_URL = "postgresql://postgres:admin@localhost:5432/conuhacks"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Item(Base):
    __tablename__ = "history"
    history_id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    stamp = Column(DateTime, default=datetime.utcnow)
    filename = Column(String(255))
    fire_count = Column(Integer)
    delayed_fire_count = Column(Integer)
    op_cost = Column(String(255))
    damage_cost = Column(String(255))
    low_severity = Column(Integer)
    med_severity = Column(Integer)
    high_severity = Column(Integer)
    d_low_severity = Column(Integer)
    d_med_severity = Column(Integer)
    d_high_severity = Column(Integer)


Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    return db
