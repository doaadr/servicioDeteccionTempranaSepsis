###===================================================
### Definici�n de Logging para paquete es.aragon.salud...
###===================================================
log4j.logger.es.aragon.salud=INFO, HCESERVICE, CORREO
###===================================================
### Definici�n de Logging para SpringFramework
###===================================================
log4j.logger.org.springframework=INFO, HCESERVICE
log4j.logger.org.apache.cxf=INFO, HCESERVICE
###===================================================
### Definici�n de APPENDERS
###===================================================
## Mail Appender
log4j.appender.CORREO=org.apache.log4j.net.SMTPAppender
log4j.appender.CORREO.To=hce@salud.aragon.es
log4j.appender.CORREO.From=mailappsalud@aragon.es
log4j.appender.CORREO.SMTPHost=127.0.0.1
log4j.appender.CORREO.SMTPUsername=mailappsalud@aragon.es
log4j.appender.CORREO.SMTPPassword=7PkVEFH.
log4j.appender.CORREO.Threshold=FATAL
log4j.appender.CORREO.BufferSize=1
log4j.appender.CORREO.Subject=[HCEService PRO] Error en aplicacion
log4j.appender.CORREO.layout=org.apache.log4j.PatternLayout
log4j.appender.CORREO.layout.ConversionPattern= %d | %p | %t | %c | %m %n
###===================================================
## Appender a fichero
# almacena el fichero de log diariamente
log4j.appender.HCESERVICE=org.apache.log4j.DailyRollingFileAppender
# path y nombre del fichero de log
log4j.appender.HCESERVICE.File=/logs/app/hceservice/hceservice.log
#N�mero m�ximo de ficheros de backup
# Se guarda el fichero de log de cada d�a
log4j.appender.HCESERVICE.DatePattern='.'yyyy-MM-dd
#Definir el formato de salida del log por fichero
log4j.appender.HCESERVICE.layout=org.apache.log4j.PatternLayout
# formato de escritura en el fichero de log
# %d fecha
# %p prioridad
# %m mensaje
# %n salto de l�nea
log4j.appender.HCESERVICE.layout.ConversionPattern= %d | %p | %t | %c | %m %n
