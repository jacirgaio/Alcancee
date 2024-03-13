import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'ReactNactiveSQLiteAlcancce.db'; // Nome do banco de dados
const database_version = '1.0'; // Versão do banco de dados
const database_displayname = 'SQLite React Native Offline Database'; // Nome de exibição do banco de dados
const database_size = 200000; // tamanho máximo do banco de dados

/** **   ATENÇÃO   *****

comando para instalar o SQLite: npm install --save react-native-sqlite-storage

********************** */

export default class SalaDB {
  Conectar() { //* *** CRUD => CREATE - aqui o BD é aberto e a tabela é criada se não existir *****/
    let db;
    return new Promise((resolve) => {
      console.log('Checando a integridade do plugin ...');
      SQLite.echoTest().then(() => {
        console.log('Integridade Ok ...');
        console.log('Abrindo Banco de Dados ...');
        SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then((DB) => {
          db = DB;
          console.log('Banco de dados Aberto');
          // verifica se existe alguma tabela
          db.executeSql('SELECT 1 FROM SalaAlcance LIMIT 1').then(() => {
            console.log('O banco de dados está pronto ... Executando Consulta SQL ...');
          }).catch((error) => {
            console.log('Erro Recebido: ', error);
            console.log('O Banco de dados não está pronto... Criando tabela');
            db.transaction((tx) => {
              // aqui a tabela é criada, se ainda não existir
              // identificacaoSala, dataReservaSala, horaReservaSala, profissionalReservaSala, status
              tx.executeSql('CREATE TABLE IF NOT EXISTS SalaAlcance (id INTEGER PRIMARY KEY AUTOINCREMENT, identificacaoSala varchar(50), dataReservaSala TEXT, horaReservaSala TEXT, profissionalReservaSala varchar(50), status varchar(50), imagem TEXT)');
            }).then(() => {
              console.log('Tabela criada com Sucesso');
            }).catch((error) => {
              console.log(error);
            });
          });
          resolve(db);
        }).catch((error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log('echoTest Falhou - plugin não funcional');
      });
    });
  }

  Desconectar(db) {
    if (db) {
      console.log('Fechando Banco de Dados');
      db.close().then((status) => {
        console.log('Banco de dados Desconectado!!');
      }).catch((error) => {
        this.errorCB(error);
      });
    } else {
      console.log('A conexão com o banco não está aberta');
    }
  }

  Listar() { //* *** CRUD => READ - aqui a tabela é lida *****/
    return new Promise((resolve) => {
      const lista = [];
      this.Conectar().then((db) => {
        db.transaction((tx) => {
          // Query SQL para listar os dados da tabela
          tx.executeSql('SELECT * FROM SalaAlcance', []).then(([tx, results]) => {
            console.log('Consulta completa');
            const len = results.rows.length;
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              const {
                id, identificacaoSala, dataReservaSala, horaReservaSala, profissionalReservaSala, status, imagem,
              } = row;
              lista.push({
                id, identificacaoSala, dataReservaSala, horaReservaSala, profissionalReservaSala, status, imagem,
              });
            }
            console.log(lista);

            resolve(lista);
          });
        }).then((result) => {
          this.Desconectar(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  Inserir(item) { //* *** CRUD => UPDATE - aqui um registro da tabela é inserido *****/
    return new Promise((resolve) => {
      this.Conectar().then((db) => {
        db.transaction((tx) => {
          // Query SQL para inserir um novo registro
          tx.executeSql('INSERT INTO SalaAlcance (identificacaoSala, dataReservaSala, horaReservaSala, profissionalReservaSala, status, imagem) VALUES (?, ?, ?, ?, ?, ?)', [item.identificacaoSala, item.dataReservaSala, item.horaReservaSala, item.profissionalReservaSala, item.status, item.imagem]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.Desconectar(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  Atualizar(id, status) { //* *** CRUD => UPDATE - aqui a tabela é atualizada *****/
    return new Promise((resolve) => {
      this.Conectar().then((db) => {
        db.transaction((tx) => {
          // Query SQL para atualizar um registro no banco
          tx.executeSql('UPDATE SalaAlcance SET status = ? WHERE id = ?', [status, id]).then(([tx, results]) => {
            resolve(results);
          });
        }).then((result) => {
          this.Desconectar(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  Remover(id) { //* *** CRUD => DELETE - aqui um registro da tabela é removido *****/
    return new Promise((resolve) => {
      this.Conectar().then((db) => {
        db.transaction((tx) => {
          // Query SQL para deletar um item da base de dados
          tx.executeSql('DELETE FROM SalaAlcance WHERE Id = ?', [id]).then(([tx, results]) => {
            console.log(results);
            resolve(results);
          });
        }).then((result) => {
          this.Desconectar(db);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }
}
