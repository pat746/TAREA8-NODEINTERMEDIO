const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Mostrar todos los pacientes
router.get('/', async (req, res) => {
  try {
    const consulta = `
      SELECT 
        P.idpaciente,
        D.nombre AS nombre_doctor,
        D.especialidad,
        P.nombre_paciente,
        P.diagnostico
      FROM pacientes P
        INNER JOIN doctores D ON P.iddoctor = D.iddoctor
    `;
    const [pacientes] = await db.query(consulta);
    res.render('index', { pacientes });
  } catch (error) {
    console.error(error);
  }
});

// Mostrar formulario para crear nuevo paciente
router.get('/create', async (req, res) => {
  try {
    const [doctores] = await db.query("SELECT * FROM doctores");
    res.render('create', { doctores });
  } catch (error) {
    console.error(error);
  }
});

// Procesar formulario para crear nuevo paciente
router.post('/create', async (req, res) => {
  try {
    const { iddoctor, nombre_paciente, diagnostico } = req.body;
    await db.query(
      "INSERT INTO pacientes (iddoctor, nombre_paciente, diagnostico) VALUES (?, ?, ?)",
      [iddoctor, nombre_paciente, diagnostico]
    );
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

// Eliminar paciente
router.get('/delete/:id', async (req, res) => {
  try {
    const idEliminar = req.params.id;
    await db.query("DELETE FROM pacientes WHERE idpaciente = ?", [idEliminar]);
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

// Mostrar formulario para editar paciente
router.get('/edit/:id', async (req, res) => {
  try {
    const [doctores] = await db.query("SELECT * FROM doctores");
    const [datos] = await db.query(
      "SELECT * FROM pacientes WHERE idpaciente = ?",
      [req.params.id]
    );

    if (datos.length === 0) {
      return res.redirect('/');
    }

    res.render('edit', { doctores, paciente: datos[0] });
  } catch (error) {
    console.error(error);
  }
});

// Procesar formulario para editar paciente
router.post('/edit/:id', async (req, res) => {
  try {
    const { iddoctor, nombre_paciente, diagnostico } = req.body;
    await db.query(
      "UPDATE pacientes SET iddoctor = ?, nombre_paciente = ?, diagnostico = ? WHERE idpaciente = ?",
      [iddoctor, nombre_paciente, diagnostico, req.params.id]
    );
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
