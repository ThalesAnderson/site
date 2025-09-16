from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import Base, Certificado

engine = create_engine("sqlite:///certificados.db")
Session = sessionmaker(bind=engine)
session = Session()

# Inserir exemplos
cert1 = Certificado(codigo="ABC123", arquivo="certificado1.png")
cert2 = Certificado(codigo="XYZ789", arquivo="certificado2.png")

session.add_all([cert1, cert2])
session.commit()
session.close()

print("Banco populado com certificados de teste.")
