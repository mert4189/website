const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = 8080;
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost', // MySQL sunucusunun adı
  user: 'root', // Veritabanı kullanıcı adı
  password: '', // Veritabanı parolası
  database: 'website' // Veritabanı adı
});
db.connect((err) => {
  if (err) {
    console.error('Veritabanı bağlantısı başarısız oldu: ' + err.stack);
    return;
  }

  console.log('Veritabanına başarıyla bağlandı!');
});
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM kullanıcılar WHERE kullanıcıadı = ? AND sifre = ?";
  const values = [
    req.body.kullanıcıadı,
    req.body.sifre
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      return res.json("Hata");
    }

    if (results.length > 0) {
      const rol = results[0].rol;
      const ad = results[0].ad; 
      const soyad = results[0].soyad; 
      const id = results[0].id; 
      const kullanıcıadı = results[0].kullanıcıadı; 
      const olusturankisi = results[0].olusturankisi; 
      if (rol === "superuser") {
        return res.json({ rol: "superuser", ad ,soyad,id,kullanıcıadı,olusturankisi});
      }
      if (rol === "admin") {
        return res.json({ rol: "admin", ad,soyad,id ,kullanıcıadı,olusturankisi});
      }
      if (rol === "customer") {
        return res.json({ rol: "customer", ad,soyad ,id,kullanıcıadı,olusturankisi});
      }
      if (rol === "dispatcher") {
        return res.json({ rol: "dispatcher", ad,soyad ,id,kullanıcıadı,olusturankisi});
      }
    }

    return res.json("kayıt yok");
  });
});

app.get('/aladmin', (req, res) => {
  const sql = ' SELECT * FROM kullanıcılar WHERE rol="admin" ';
  db.query(sql, (error, gelenadmin) => {
    if (error) throw error;

    res.send(gelenadmin);
  })
})
app.post('/adminolustur', (req, res) => {
  const sql = "INSERT INTO kullanıcılar (ad,soyad,kullanıcıadı,sifre,mail,telno,rol,olusturankisi) VALUES (?)";
  const values = [
    req.body.ad,
    req.body.soyad,
    req.body.kullanıcıadı,
    req.body.sifre,
    req.body.mail,
    req.body.telno,
    req.body.rol,
    req.body.olusturankisi
   
  ]
  db.query(sql, [values
  ], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.json(data))
    }
  })
})
app.post('/adminsil/:id', function (req, res) {
  const id = req.params.id;
  console.log("pofgh", id)
  const sql = "DELETE FROM kullanıcılar WHERE id = ?";
  db.query(sql, id, function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send("Silme işlemi başarısız oldu.");
    } else {
      console.log("Kayıt silindi: ", id);
      res.status(200).send("Kayıt başarıyla silindi.");
    }
  });
});
app.get('/alcustomer', (req, res) => {
  const sql = ' SELECT * FROM kullanıcılar WHERE rol="customer" ';
  db.query(sql, (error, gelencustomer) => {
    if (error) throw error;

    res.send(gelencustomer);
  })
})
app.post('/fiyatolustur', (req, res) => {
  const sql = "INSERT INTO parametreler (malzeme,fiyat,iliski) VALUES (?)";
  const values = [
    req.body.malzeme,
    req.body.fiyat,
    req.body.iliski
  ]
  db.query(sql, [values
  ], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.json(data))
    }
  })
})
app.get('/alfiyat', (req, res) => {
  const iliski = req.query.getAd;

  const sql = `SELECT * FROM parametreler WHERE iliski = ?`;
  db.query(sql, [iliski], (err, result) => {
    if (err) throw err;
    res.json(result);
    console.log(result);
    console.log(iliski);
  });
});
app.post('/talepolustur', (req, res) => {
  const sql = "INSERT INTO talepler (ad,tarih,saat,secilenmalzeme,fiyat,durum,yolcusayısı,bagajsayısı,acıklama,aractipi,odanumarası,ucuskodu,olusturankisi,olusturanadmin) VALUES (?)";
  const values = [
    req.body.ad,
    req.body.tarih,
    req.body.saat,
    req.body.secilenmalzeme,
    req.body.fiyat,
    req.body.durum,
    req.body.yolcusayısı,
    req.body.bagajsayısı,
    req.body.acıklama,
    req.body.aractipi,
    req.body.odanumarası,
    req.body.ucuskodu,
    req.body.olusturankisi,
    req.body.olusturanadmin,
  
  ]
  db.query(sql, [values
  ], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res.json(data))
    }
  })
})
app.get('/altalep', (req, res) => {
  const olusturankisi = req.query.getAd;

  const sql = `SELECT * FROM talepler WHERE olusturankisi = ? `;
  db.query(sql, [olusturankisi], (err, gelentalep) => {
    if (err) throw err;
    res.send(gelentalep);
    console.log(gelentalep);
    console.log(olusturankisi);
  });
});
app.get('/altalep1', (req, res) => {
  const olusturanadmin = req.query.getUser;

  const sql = `SELECT * FROM talepler WHERE olusturanadmin = ? `;
  db.query(sql, [olusturanadmin], (err, gelentalep) => {
    if (err) throw err;
    res.send(gelentalep);
    console.log(gelentalep);
    console.log(olusturanadmin);
  });
});

app.post('/taleponayla/:id', function (req, res) {
  const id = req.params.id;
  
  const sql = "UPDATE talepler SET durum = ? WHERE id=?";
  const values = [
   req.body.durum,
   id
  ];
  console.log(values)
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Bir hata oluştu.");
    } else {
      console.log(data);
      res.status(200).json({ message: "Kayıt başarıyla güncellendi." });
    }
  });
});
app.post('/talepreddet/:id', function (req, res) {
  const id = req.params.id;
  
  const sql = "UPDATE talepler SET durum = ? WHERE id=?";
  const values = [
   req.body.durum,
   id
  ];
  console.log(values)
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Bir hata oluştu.");
    } else {
      console.log(data);
      res.status(200).json({ message: "Kayıt başarıyla güncellendi." });
    }
  });
});
app.post('/yolcugonder', (req, res) => {
  const sql = "INSERT INTO yolcular (yolcuadlari) VALUES (?)";
  const values = [
    req.body.yolcuadlari,
    
  ];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.json(data));
    }
  });
});
app.get('/altalep1/:getAd', (req, res) => {
  const olusturankisi = req.params.getAd;

  const sql = `SELECT * FROM talepler WHERE olusturankisi = ? AND durum = 'beklemede'`;
  db.query(sql, [olusturankisi], (err, gelentalep) => {
    if (err) throw err;
    res.send(gelentalep);
    console.log(gelentalep);
    console.log(olusturankisi);
  });
});


app.post('/talepfiyat/:id', function (req, res) {
  const id = req.params.id;
  
  const sql = "UPDATE talepler SET fiyat = ? WHERE id=?";
  const values = [
   req.body.fiyat,
   id
  ];
  console.log(values)
  db.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Bir hata oluştu.");
    } else {
      console.log(data);
      res.status(200).json({ message: "Kayıt başarıyla güncellendi." });
    }
  });
});
app.get('/aladminad/:getUser', (req, res) => {
  const id = req.params.getUser
  const sql = ' SELECT * FROM kullanıcılar WHERE id = ? ';
  db.query(sql,[id], (error, geelenadmin1) => {
    if (error) throw error;


    res.send(geelenadmin1);
  })
  console.log(id)
})
app.get('/altalep2', (req, res) => {
  const olusturanadmin = req.query.getAdmin;

  const sql = `SELECT * FROM talepler WHERE olusturanadmin = ? AND (durum = 'onaylandı' OR durum = 'reddedildi')`;
  db.query(sql, [olusturanadmin], (err, gelentalep) => {
    if (err) throw err;
    res.send(gelentalep);
    console.log(gelentalep);
    console.log(olusturanadmin);
  });
});

app.get('/aldispatchertalep', (req, res) => {
 

  const sql = `SELECT * FROM talepler  `;
  db.query(sql, (err, gelentalep) => {
    if (err) throw err;
    res.send(gelentalep);
    console.log(gelentalep);
   
  });
});




app.listen(port, () => console.log(`Server listening on port ${port}`));
