from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import sessionmaker, declarative_base
import os

app = Flask(__name__)
CORS(app)

# Configuração do banco (SQLite local)
engine = create_engine("sqlite:///certificados.db")
Session = sessionmaker(bind=engine)
Base = declarative_base()

# Modelo da tabela
class Certificado(Base):
    __tablename__ = "certificados"
    codigo = Column(String, primary_key=True)
    arquivo = Column(String)

Base.metadata.create_all(engine)

# Rota para buscar certificado pelo código
@app.route("/certificado")
def buscar_certificado():
    codigo = request.args.get("codigo")
    session = Session()
    cert = session.query(Certificado).filter_by(codigo=codigo).first()
    session.close()

    if cert:
        return jsonify({"url": f"/certificados/{cert.arquivo}"})
    else:
        return jsonify({"erro": "Certificado não encontrado"}), 404

# Rota para servir os arquivos de certificado
@app.route('/certificados/<path:filename>')
def servir_certificado(filename):
    return send_from_directory(os.path.join(os.path.dirname(__file__), 'certificados'), filename)

from flask import render_template_string

# Página simples de admin para adicionar certificados
@app.route("/admin", methods=["GET", "POST"])
def admin():
    html = """
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>Admin Certificados</title>
    </head>
    <body>
        <h1>Adicionar Novo Certificado</h1>
        <form method="post" enctype="multipart/form-data">
            Código: <input type="text" name="codigo" required><br><br>
            Arquivo: <input type="file" name="arquivo" accept="image/*" required><br><br>
            <button type="submit">Adicionar</button>
        </form>
        {% if mensagem %}<p style="color:green;">{{ mensagem }}</p>{% endif %}
    </body>
    </html>
    """
    from flask import request
    mensagem = ""
    if request.method == "POST":
        codigo = request.form["codigo"]
        arquivo = request.files["arquivo"]
        # Salvar arquivo na pasta certificados
        caminho = os.path.join("certificados", arquivo.filename)
        arquivo.save(caminho)
        # Adicionar no banco
        session = Session()
        novo_cert = Certificado(codigo=codigo, arquivo=arquivo.filename)
        session.add(novo_cert)
        session.commit()
        session.close()
        mensagem = f"Certificado {codigo} adicionado com sucesso!"
    return render_template_string(html, mensagem=mensagem)

if __name__ == "__main__":
    app.run(debug=True)
