--==========================================================
--Base de datos de Explotación
--==========================================================
/* Formatted on 2015/01/27 14:54 (Formatter Plus v4.8.8) */
SELECT plan_table_output
  FROM TABLE (DBMS_XPLAN.display ());

explain plan for
SELECT   codigo_aviso, num_inc, nombre_pac, apellidos_pac, destino,
         MIN (base), cod_cie9, desc_cie9, 
         DECODE (hospital_origen,
                 NULL, NVL (tpvia, '')
                  || NVL (nom, '')
                  || NVL (tra, '')
                  || NVL (blq, '')
                  || NVL (esc, '')
                  || NVL (piso, '')
                  || NVL (pta, '')
                  || NVL (pob, '')
                  || NVL (mun, '')
                  || NVL (pro, '')
                  || NVL (region, ''),
                    NVL (hospital_origen, '')
                 || NVL (servicio_origen, '')
                 || '-'
                 || NVL (hospital_destino, '')
                 || NVL (servicio_destino, '')
                ) direccion_inc,
         fecha_inc, MIN (hora_llamada_ccu),
         MIN (hora_activacion_ume), MIN (hora_inicio_asistencia),
         MIN (hora_salida_destino), MAX (hora_llegada_destino),
         MIN (hora_alerta_hemodinamica), MIN (alerta_hemodinamica),
         MIN (destino_alerta_hemodinamica)
    FROM (SELECT a.codigo codigo_aviso, a.num_incidencia num_inc,
                 a.nombre_pac, a.apellidos_pac, a.servicio_pac destino,
                 DECODE (t.cod_tip_rec, 'UV', p.nom_rec, NULL) base,
                 e.eti_codigo cod_cie9, e.desc_eti_codigo desc_cie9,
                DECODE
                    (INSTR (i.direccion_inc, '$$POX'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$POX') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$POX'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) utm_x,
                 DECODE
                    (INSTR (i.direccion_inc, '$$POY'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$POY') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$POY'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) utm_y,
                 DECODE
                    (INSTR (i.direccion_inc, '$$TPVIA'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$TPVIA') + 7,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$TPVIA'
                                                       )
                                               + 8
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) tpvia,
                 DECODE
                      (INSTR (i.direccion_inc, '$$NOM'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$NOM') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$NOM'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) nom,
                 DECODE
                      (INSTR (i.direccion_inc, '$$TRA'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$TRA') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$TRA'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) tra,
                 DECODE
                      (INSTR (i.direccion_inc, '$$BLQ'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$BLQ') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$BLQ'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) blq,
                 DECODE
                      (INSTR (i.direccion_inc, '$$ESC'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$ESC') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$ESC'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) esc,
                 DECODE
                     (INSTR (i.direccion_inc, '$$PIS'),
                      0, NULL,
                         SUBSTR (i.direccion_inc,
                                 INSTR (i.direccion_inc, '$$PIS') + 5,
                                 INSTR (SUBSTR (i.direccion_inc,
                                                  INSTR (i.direccion_inc,
                                                         '$$PIS'
                                                        )
                                                + 6
                                               ),
                                        '$$'
                                       )
                                )
                      || ' '
                     ) piso,
                 DECODE
                      (INSTR (i.direccion_inc, '$$PTA'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$PTA') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$PTA'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) pta,
                 DECODE
                      (INSTR (i.direccion_inc, '$$POB'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$POB') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$POB'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) pob,
                 DECODE
                      (INSTR (i.direccion_inc, '$$MUN'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$MUN') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$MUN'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) mun,
                 DECODE
                      (INSTR (i.direccion_inc, '$$PRO'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$PRO') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$PRO'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) pro,
                 DECODE
                    (INSTR (i.direccion_inc, '$$REG'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$REG') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$REG'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) region,
                 DECODE
                    (INSTR (i.direccion_inc, '$$HOE'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$HOE') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$HOE'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) hospital_origen,
                 DECODE
                    (INSTR (i.direccion_inc, '$$SEE'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$SEE') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$SEE'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) servicio_origen,
                 DECODE
                    (INSTR (i.direccion_inc, '$$HOR'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$HOR') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$HOR'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) hospital_destino,
                 DECODE
                    (INSTR (i.direccion_inc, '$$SER'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$SER') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$SER'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) servicio_destino,
                 i.fecha_inc fecha_inc, 
                    a.fecha hora_llamada_ccu,
                 DECODE (t.motivo,
                         'Salida Aviso_', t.fecha
                        ) hora_activacion_ume,
                 DECODE (t.motivo,
                         'Llegada Aviso_', t.fecha
                        ) hora_inicio_asistencia,
                 DECODE (t.motivo,
                         'Salida Destino_', t.fecha
                        ) hora_salida_destino,
                 DECODE (t.motivo,
                         'Llegada Destino_', t.fecha
                        ) hora_llegada_destino,
                 DECODE (t.cod_tip_rec,
                         'HD', DECODE (t.motivo, 'Asignación', t.fecha, NULL),
                         NULL
                        ) hora_alerta_hemodinamica,
                 DECODE (t.cod_tip_rec,
                         'HD', DECODE (t.motivo, 'Asignación', 'SI', NULL),
                         NULL
                        ) alerta_hemodinamica,
                 DECODE (t.cod_tip_rec,
                         'HD', DECODE (t.motivo,
                                       'Asignación', t.nom_rec,
                                       NULL
                                      ),
                         NULL
                        ) destino_alerta_hemodinamica
            FROM se_avisos a,
                 se_pedidos p,
                 se_inas_diagnosticosinf e,
                 se_incidencias i,
                 se_reg_transiciones t
-- WHERE a.codigo = '201501010007'
-- WHERE  a.codigo = '201501230134'
          WHERE  a.codigo = '201501050027'
             AND a.num_incidencia = p.num_inc(+)
             AND a.informeasist = e.informe(+)
             AND a.num_incidencia = i.num_inc
             AND p.cod_pedido = t.cod_pedido(+)
             AND p.cod_pedido NOT IN (
                    SELECT cod_pedido
                      FROM se_pedidos
                     WHERE num_inc = a.num_incidencia
                       AND cod_motivo IN ('M4', 'F9'))
             AND t.cod_tip_rec IN ('UV', 'HD'))
GROUP BY codigo_aviso,
         num_inc,
         nombre_pac,
         apellidos_pac,
         destino,
         cod_cie9,
         desc_cie9,
         DECODE (hospital_origen,
                 NULL, NVL (tpvia, '')
                  || NVL (nom, '')
                  || NVL (tra, '')
                  || NVL (blq, '')
                  || NVL (esc, '')
                  || NVL (piso, '')
                  || NVL (pta, '')
                  || NVL (pob, '')
                  || NVL (mun, '')
                  || NVL (pro, '')
                  || NVL (region, ''),
                    NVL (hospital_origen, '')
                 || NVL (servicio_origen, '')
                 || '-'
                 || NVL (hospital_destino, '')
                 || NVL (servicio_destino, '')
                ),
         fecha_inc
         ;

		 
--==================================================================
--Base de datos de Operación
--==================================================================
SELECT   codigo_aviso, num_inc, nombre_pac, apellidos_pac, destino,
         MIN (base), cod_cie9, desc_cie9, 
         DECODE (hospital_origen,
                 NULL, NVL (tpvia, '')
                  || NVL (nom, '')
                  || NVL (tra, '')
                  || NVL (blq, '')
                  || NVL (esc, '')
                  || NVL (piso, '')
                  || NVL (pta, '')
                  || NVL (pob, '')
                  || NVL (mun, '')
                  || NVL (pro, '')
                  || NVL (region, ''),
                    NVL (hospital_origen, '')
                 || NVL (servicio_origen, '')
                 || '-'
                 || NVL (hospital_destino, '')
                 || NVL (servicio_destino, '')
                ) direccion_inc,
         fecha_inc, MIN (hora_llamada_ccu),
         MIN (hora_activacion_ume), MIN (hora_inicio_asistencia),
         MIN (hora_salida_destino), MAX (hora_llegada_destino),
         MIN (hora_alerta_hemodinamica), MIN (alerta_hemodinamica),
         MIN (destino_alerta_hemodinamica)
    FROM (SELECT a.codigo codigo_aviso, a.num_incidencia num_inc,
                 a.nombre_pac, a.apellidos_pac, a.servicio_pac destino,
                 DECODE (p.cod_tip_rec, 'UV', p.nom_rec, NULL) base,
                 null cod_cie9, null desc_cie9,
                DECODE
                    (INSTR (i.direccion_inc, '$$POX'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$POX') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$POX'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) utm_x,
                 DECODE
                    (INSTR (i.direccion_inc, '$$POY'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$POY') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$POY'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) utm_y,
                 DECODE
                    (INSTR (i.direccion_inc, '$$TPVIA'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$TPVIA') + 7,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$TPVIA'
                                                       )
                                               + 8
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) tpvia,
                 DECODE
                      (INSTR (i.direccion_inc, '$$NOM'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$NOM') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$NOM'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) nom,
                 DECODE
                      (INSTR (i.direccion_inc, '$$TRA'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$TRA') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$TRA'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) tra,
                 DECODE
                      (INSTR (i.direccion_inc, '$$BLQ'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$BLQ') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$BLQ'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) blq,
                 DECODE
                      (INSTR (i.direccion_inc, '$$ESC'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$ESC') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$ESC'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) esc,
                 DECODE
                     (INSTR (i.direccion_inc, '$$PIS'),
                      0, NULL,
                         SUBSTR (i.direccion_inc,
                                 INSTR (i.direccion_inc, '$$PIS') + 5,
                                 INSTR (SUBSTR (i.direccion_inc,
                                                  INSTR (i.direccion_inc,
                                                         '$$PIS'
                                                        )
                                                + 6
                                               ),
                                        '$$'
                                       )
                                )
                      || ' '
                     ) piso,
                 DECODE
                      (INSTR (i.direccion_inc, '$$PTA'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$PTA') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$PTA'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) pta,
                 DECODE
                      (INSTR (i.direccion_inc, '$$POB'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$POB') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$POB'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) pob,
                 DECODE
                      (INSTR (i.direccion_inc, '$$MUN'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$MUN') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$MUN'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) mun,
                 DECODE
                      (INSTR (i.direccion_inc, '$$PRO'),
                       0, NULL,
                          SUBSTR (i.direccion_inc,
                                  INSTR (i.direccion_inc, '$$PRO') + 5,
                                  INSTR (SUBSTR (i.direccion_inc,
                                                   INSTR (i.direccion_inc,
                                                          '$$PRO'
                                                         )
                                                 + 6
                                                ),
                                         '$$'
                                        )
                                 )
                       || ' '
                      ) pro,
                 DECODE
                    (INSTR (i.direccion_inc, '$$REG'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$REG') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$REG'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) region,
                 DECODE
                    (INSTR (i.direccion_inc, '$$HOE'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$HOE') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$HOE'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) hospital_origen,
                 DECODE
                    (INSTR (i.direccion_inc, '$$SEE'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$SEE') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$SEE'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) servicio_origen,
                 DECODE
                    (INSTR (i.direccion_inc, '$$HOR'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$HOR') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$HOR'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) hospital_destino,
                 DECODE
                    (INSTR (i.direccion_inc, '$$SER'),
                     0, NULL,
                        SUBSTR (i.direccion_inc,
                                INSTR (i.direccion_inc, '$$SER') + 5,
                                INSTR (SUBSTR (i.direccion_inc,
                                                 INSTR (i.direccion_inc,
                                                        '$$SER'
                                                       )
                                               + 6
                                              ),
                                       '$$'
                                      )
                               )
                     || ' '
                    ) servicio_destino,
                 i.fecha_inc||' '||i.hora_inc fecha_inc,, 
                    a.fecha||' '||a.hora hora_llamada_ccu,
                 DECODE (t.motivo,
                         'Salida Aviso_', t.fecha||' '||t.hora
                        ) hora_activacion_ume,
                 DECODE (t.motivo,
                         'Llegada Aviso_', t.fecha||' '||t.hora
                        ) hora_inicio_asistencia,
                 DECODE (t.motivo,
                         'Salida Destino_', t.fecha||' '||t.hora
                        ) hora_salida_destino,
                 DECODE (t.motivo,
                         'Llegada Destino_', t.fecha||' '||t.hora
                        ) hora_llegada_destino,
                 DECODE (p.cod_tip_rec,
                         'HD', DECODE (t.motivo, 'Asignación', t.fecha||' '||t.hora, NULL),
                         NULL
                        ) hora_alerta_hemodinamica,
                 DECODE (p.cod_tip_rec,
                         'HD', DECODE (t.motivo, 'Asignación', 'SI', NULL),
                         NULL
                        ) alerta_hemodinamica,
                 DECODE (p.cod_tip_rec,
                         'HD', DECODE (t.motivo,
                                       'Asignación', p.nom_rec,
                                       NULL
                                      ),
                         NULL
                        ) destino_alerta_hemodinamica
            FROM seneca.avisos a,
                 seneca.pedidos p,
                 seneca.incidencias i,
                 seneca.reg_transiciones t
          WHERE  a.codigo = '201501280269'
             AND a.num_incidencia = p.num_inc(+)
             AND a.num_incidencia = i.num_inc
             AND p.cod_pedido = t.cod_pedido(+)
             AND p.cod_pedido NOT IN (
                    SELECT cod_pedido
                      FROM seneca.pedidos
                     WHERE num_inc = a.num_incidencia
                       AND cod_motivo IN ('M4', 'F9'))
             AND p.cod_tip_rec IN ('UV', 'HD'))
GROUP BY codigo_aviso,
         num_inc,
         nombre_pac,
         apellidos_pac,
         destino,
         cod_cie9,
         desc_cie9,
         DECODE (hospital_origen,
                 NULL, NVL (tpvia, '')
                  || NVL (nom, '')
                  || NVL (tra, '')
                  || NVL (blq, '')
                  || NVL (esc, '')
                  || NVL (piso, '')
                  || NVL (pta, '')
                  || NVL (pob, '')
                  || NVL (mun, '')
                  || NVL (pro, '')
                  || NVL (region, ''),
                    NVL (hospital_origen, '')
                 || NVL (servicio_origen, '')
                 || '-'
                 || NVL (hospital_destino, '')
                 || NVL (servicio_destino, '')
                ),
         fecha_inc
         ;
		 