##-----------------------------------------------------
## Consulta HIS
##-----------------------------------------------------
CONSULTA_HIS= \
SELECT cit.numerohc, \
       cit.numicu, \
       TRIM(decode (cit.tipopaci, \
               'N', 'NORMAL', \
               'P', 'PREFERENTE', \
               'Desconocido')) prioridad, \
       TRIM(pro.proceden) procedede, \
       CASE \
          WHEN cit.procedede = 0 \
            THEN 'OTROS' \
          WHEN cit.procedede = 1 \
            THEN TRIM(ser_procede.nomserv) \
          WHEN cit.procedede = 2 \
            THEN TRIM(NVL(ser_procede.nomserv, hos_procede.nomhospital)) \
          WHEN cit.procedede = 3 \
            THEN TRIM(insp_procede.descinsp) \
          WHEN cit.procedede = 4 \
            THEN TRIM(pri_procede.descentro) \
          WHEN cit.procedede = 5 \
            THEN TRIM(ser_procede.nomserv) \
       END centro_unidad \
 FROM citas cit, \
      des_procede pro, \
      OUTER servicios ser_procede, \
      OUTER hospitales hos_procede, \
      OUTER centropri pri_procede, \
      OUTER inspecciones insp_procede \
WHERE cit.numicu = ? \
  AND cit.procedede = pro.codigo \
  AND cit.servpeti = ser_procede.codserv \
  AND cit.servpeti = hos_procede.codhospi \
  AND cit.servpeti = pri_procede.codcentro \
  AND cit.servpeti = insp_procede.codinsp
  
##-----------------------------------------------------
## Consulta Agendas de Rehabilitacion
##-----------------------------------------------------
CONSULTA_AGENDAS_REHABILITACION= \
SELECT DISTINCT(TRIM(def.idagenda)) as idagenda, \
	   TRIM(def.descagen) as descagen, \
	   def.codcentro as codcentro, \
	   def.codservi as codservi, \
	   def.codmedic as codmedic, \
       def.serv_auto as serv_auto \
FROM defagen def, servicios serv, maes_servicio maes, horarios hor \
WHERE def.idagenda = hor.idagenda \
AND def.codservi = serv.codserv \
AND serv.maes_serv = maes.servicio \
AND hor.fechaFin >= TODAY \
AND hor.activo='S' \
AND def.activa='S' \
AND maes.codaut = ? \
ORDER BY idagenda ASC

##-----------------------------------------------------
## Consulta Citas Registradas TMG
##-----------------------------------------------------
CONSULTA_CITAS_REGISTRADAS= \
select  \
a.numerohc as NHC, \
a.numicu as NUMICU, \
a.fecha as FECHA, \
servreal as SERVREAL, \
nomserv  as NOMSERV, \
a.horaini as HORAINI, \
a.idagenda as ID_AGENDA, \
d.descagen as DESC_AGENDA, \
(case when realizada='N' then 'NO ACUDIO' when realizada='S' then 'REALIZADA' else 'REALIZADA URGENTE' end) AS FINALIZACION \
from actividad a inner join servicios s on (s.codserv=a.servreal) inner join defagen d on(a.idagenda=d.idagenda) inner join pacientes p on (a.numerohc = p.numerohc) \
where p.cip_auto = ? \
and a.fecha is not null and a.fecha > today-30 \
and substr(codaut,1,4)='0U69' \
order by a.fecha desc;

##--------------------------------------------------------
## Consulta Episodio PCH desde HIS
##--------------------------------------------------------

CONSULTA_EPISODIO_PCH_DESDE_HIS= \
SELECT numicu \
FROM alta_urg \
WHERE motivo_alta='6' \
AND icuhospi = ?;

##-----------------------------------------------------
## Consulta Citas Pendientes TMG
##-----------------------------------------------------
CONSULTA_CITAS_PENDIENTES_PSQ= \
select  \
a.numerohc as NHC, \
a.numicu as NUMICU, \
a.fecha as FECHA, \
servreal as SERVREAL, \
nomserv  as NOMSERV, \
a.idagenda as ID_AGENDA, \
d.descagen as DESC_AGENDA \
from citas a inner join servicios s on (s.codserv=a.servreal) inner join defagen d on(a.idagenda=d.idagenda) inner join pacientes p on (a.numerohc = p.numerohc) \
where p.cip_auto = ? \
and substr(codaut,1,4)='0U69' \
order by a.fecha desc;

##-----------------------------------------------------
## Consulta Numero Peticion GIPE segun NHC y NUMICU
##-----------------------------------------------------
CONSULTA_NUMPETI_GIPE_BY_NHC_AND_NUMICU= \
     SELECT pet.numerohc AS nhc, \
            pet.numcita AS num_cita, \
            pet.numpeti AS num_peti, \
            pet.servcita AS serv_cita, \
            pet.servpeti AS serv_peti, \
            pet.perspeti AS pers_peti, \
            pet.feccita AS fec_cita, \
            pet.fec_peti AS fec_peti, \
            pet.obsepeti AS observ_peti \
       FROM citas cit \
  LEFT JOIN peticita pet ON (cit.ncita = pet.numcita AND cit.numerohc = pet.numerohc) \
WHERE UPPER(pet.grabausu) = 'GIPE' \
        AND cit.numerohc = ? \
        AND cit.numicu = ? \
      UNION \
     SELECT pet.numerohc AS nhc, \
            pet.numcita AS num_cita, \
            pet.numpeti AS num_peti, \
            pet.servcita AS serv_cita, \
            pet.servpeti AS serv_peti, \
            pet.perspeti AS pers_peti, \
            pet.feccita AS fec_cita, \
            pet.fec_peti AS fec_peti, \
            pet.obsepeti AS observ_peti \
       FROM actividad act \
  LEFT JOIN peticita pet ON (act.numicu = pet.numcita AND act.numerohc = pet.numerohc) \
WHERE UPPER(pet.grabausu) = 'GIPE' \
        AND act.numerohc = ? \
        AND act.numicu = ?;
        
##-----------------------------------------------------
## Consulta serie Informix por numicu 
##-----------------------------------------------------
CONSULTA_SERIE_INFORMIX_BY_NUMICU= \
SELECT r.serie \
           FROM hc_rispacs r \
          WHERE r.numicu = ? \
            AND r.url_informe IS NULL;