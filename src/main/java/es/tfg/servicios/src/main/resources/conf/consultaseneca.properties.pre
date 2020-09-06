## Forzamos enconding (á)(é)(í)(ó)(ú)
##-----------------------------------------------------
## Consulta Seneca Explotacion
##-----------------------------------------------------
CONSULTA_SENECA_EXPL= \
SELECT   codigo_aviso, \
         num_inc, \
         nombre_pac, \
         apellidos_pac, \
         destino, \
         MIN (base) base, \
         cod_cie9, \
         desc_cie9, \
         direccion, \
         fecha_inc, \
         MIN (hora_llamada_ccu) fecha_aviso, \
         MIN (hora_activacion_ume) fecha_salida_aviso, \
         MIN (hora_inicio_asistencia) fecha_llegada_aviso_base, \
         MIN (hora_salida_destino) fecha_salida_destino, \
         MAX (hora_llegada_destino) fecha_llegada_destino, \
         MIN (hora_alerta_hemodinamica) hora_alerta_hemodinamica, \
         MIN (alerta_hemodinamica) alerta_hemodinamica, \
         MIN (destino_alerta_hemodinamica) alerta_hemodinamica_destino \
    FROM (SELECT a.codigo codigo_aviso, a.num_incidencia num_inc, \
                 a.nombre_pac, a.apellidos_pac, a.servicio_pac destino, \
                 DECODE (t.cod_tip_rec, 'UV', p.nom_rec, NULL) base, \
                 e.eti_codigo cod_cie9, e.desc_eti_codigo desc_cie9, \
                 i.direccion_inc direccion, \
                 i.fecha_inc fecha_inc, \
                    a.fecha hora_llamada_ccu, \
                 DECODE (t.motivo, \
                         'Salida Aviso_', t.fecha \
                        ) hora_activacion_ume, \
                 DECODE (t.motivo, \
                         'Llegada Aviso_', t.fecha \
                        ) hora_inicio_asistencia, \
                 DECODE (t.motivo, \
                         'Salida Destino_', t.fecha \
                        ) hora_salida_destino, \
                 DECODE (t.motivo, \
                         'Llegada Destino_', t.fecha \
                        ) hora_llegada_destino, \
                 DECODE (t.cod_tip_rec, \
                         'HD', DECODE (t.motivo, 'Asignación', t.fecha, NULL), \
                         NULL \
                        ) hora_alerta_hemodinamica, \
                 DECODE (t.cod_tip_rec, \
                         'HD', DECODE (t.motivo, 'Asignación', 'SI', NULL), \
                         NULL \
                        ) alerta_hemodinamica, \
                 DECODE (t.cod_tip_rec, \
                         'HD', DECODE (t.motivo, \
                                       'Asignación', t.nom_rec, \
                                       NULL \
                                      ), \
                         NULL \
                        ) destino_alerta_hemodinamica \
            FROM se_avisos a, \
                 se_pedidos p, \
                 se_inas_diagnosticosinf e, \
                 se_incidencias i, \
                 se_reg_transiciones t \
          WHERE  a.codigo = ? \
             AND a.num_incidencia = p.num_inc(+) \
             AND a.informeasist = e.informe(+) \
             AND a.num_incidencia = i.num_inc \
             AND p.cod_pedido = t.cod_pedido(+) \
             AND p.cod_pedido NOT IN ( \
                    SELECT cod_pedido \
                      FROM se_pedidos \
                     WHERE num_inc = a.num_incidencia \
                       AND cod_motivo IN ('M4', 'F9')) \
             AND t.cod_tip_rec IN ('UV', 'HD')) \
GROUP BY codigo_aviso, \
         num_inc, \
         nombre_pac, \
         apellidos_pac, \
         destino, \
         cod_cie9, \
         desc_cie9, \
         direccion, \
         fecha_inc

##-----------------------------------------------------
## Consulta Seneca Operacion
##-----------------------------------------------------
CONSULTA_SENECA_OPER= \
SELECT   codigo_aviso, \
         num_inc, \
         nombre_pac, \
         apellidos_pac, \
         destino, \
         MIN (base) base, \
         cod_cie9, \
         desc_cie9, \
       	 direccion, \
         fecha_inc, \
         MIN (hora_llamada_ccu) fecha_aviso, \
         MIN (hora_activacion_ume) fecha_salida_aviso, \
         MIN (hora_inicio_asistencia) fecha_llegada_aviso_base, \
         MIN (hora_salida_destino) fecha_salida_destino, \
         MAX (hora_llegada_destino) fecha_llegada_destino, \
         MIN (hora_alerta_hemodinamica) hora_alerta_hemodinamica, \
         MIN (alerta_hemodinamica) alerta_hemodinamica, \
         MIN (destino_alerta_hemodinamica) alerta_hemodinamica_destino \
    FROM (SELECT a.codigo codigo_aviso, a.num_incidencia num_inc, \
                 a.nombre_pac, a.apellidos_pac, a.servicio_pac destino, \
                 DECODE (p.cod_tip_rec, 'UV', p.nom_rec, NULL) base, \
                 null cod_cie9, null desc_cie9, \
                 i.direccion_inc direccion, \
                 i.fecha_inc fecha_inc,  \
                    TO_DATE (a.fecha || ' ' || a.hora, \
                          'DD/MM/YY HH24:MI:SS' \
                         ) hora_llamada_ccu, \
                 DECODE (t.motivo, \
                         'Salida Aviso_', TO_DATE (t.fecha || ' ' || t.hora, \
                                                   'DD/MM/YY HH24:MI:SS' \
                                                  ) \
                        ) hora_activacion_ume, \
                 DECODE (t.motivo, \
                         'Llegada Aviso_', TO_DATE (t.fecha || ' ' || t.hora, \
                                                   'DD/MM/YY HH24:MI:SS' \
                                                  ) \
                        ) hora_inicio_asistencia, \
                 DECODE (t.motivo, \
                         'Salida Destino_', TO_DATE (t.fecha || ' ' || t.hora, \
                                                   'DD/MM/YY HH24:MI:SS' \
                                                  ) \
                        ) hora_salida_destino, \
                 DECODE (t.motivo, \
                         'Llegada Destino_', TO_DATE (t.fecha || ' ' || t.hora, \
                                                   'DD/MM/YY HH24:MI:SS' \
                                                  ) \
                        ) hora_llegada_destino, \
                 DECODE (p.cod_tip_rec, \
                         'HD', DECODE (t.motivo, 'Asignación', TO_DATE \
                                                        (   t.fecha \
                                                         || ' ' \
                                                         || t.hora, \
                                                         'DD/MM/YY HH24:MI:SS' \
                                                        ), \
                                       NULL \
                                       ), \
                         NULL \
                        ) hora_alerta_hemodinamica, \
                 DECODE (p.cod_tip_rec, \
                         'HD', DECODE (t.motivo, 'Asignación', 'SI', NULL), \
                         NULL \
                        ) alerta_hemodinamica, \
                 DECODE (p.cod_tip_rec, \
                         'HD', DECODE (t.motivo, \
                                       'Asignación', p.nom_rec, \
                                       NULL \
                                      ), \
                         NULL \
                        ) destino_alerta_hemodinamica \
            FROM seneca.avisos a, \
                 seneca.pedidos p, \
                 seneca.incidencias i, \
                 seneca.reg_transiciones t \
          WHERE  a.codigo = ? \
             AND a.num_incidencia = p.num_inc(+) \
             AND a.num_incidencia = i.num_inc \
             AND p.cod_pedido = t.cod_pedido(+) \
             AND p.cod_pedido NOT IN ( \
                    SELECT cod_pedido \
                      FROM seneca.pedidos \
                     WHERE num_inc = a.num_incidencia \
                       AND cod_motivo IN ('M4', 'F9')) \
             AND p.cod_tip_rec IN ('UV', 'HD')) \
GROUP BY codigo_aviso, \
         num_inc, \
         nombre_pac, \
         apellidos_pac, \
         destino, \
         cod_cie9, \
         desc_cie9, \
         direccion, \
         fecha_inc
