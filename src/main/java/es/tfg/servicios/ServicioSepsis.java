package es.tfg.servicios;
  

import javax.jws.WebService;

import org.apache.log4j.Logger;

import es.tfg.beans.ParametrosAEvaluarSepsis;
import es.tfg.beans.QuickSOFASalida;
import es.tfg.beans.ResultadoEvaluacionSepsis;
import es.tfg.beans.SOFASalida;
import es.tfg.logica.EvaluacionSepsis;
import excepciones.ExcepcionServicioSepsis;
  
@WebService(endpointInterface="es.tfg.servicios.IServicioSepsisWS")
public class ServicioSepsis implements IServicioSepsisWS
{
	
	private static Logger objLog =  Logger.getLogger(ServicioSepsis.class.getName());
	  
	public ResultadoEvaluacionSepsis evaluarParametrosSepsis(ParametrosAEvaluarSepsis _parametrosAEvaluarSepsis)
	{
	  ResultadoEvaluacionSepsis resultadoEvaluacionSepsis = null;
	  EvaluacionSepsis		    evaluacionSepsis		  = null;
	  SOFASalida			    sOFASalida		   		  = null;
	  QuickSOFASalida  			quickSOFASalida			  = null;
	  
	  evaluacionSepsis		  	= new EvaluacionSepsis();
	  resultadoEvaluacionSepsis = new ResultadoEvaluacionSepsis();  
	  
	  try
	  {
		sOFASalida = evaluacionSepsis.evaluarSOFA(_parametrosAEvaluarSepsis);
		resultadoEvaluacionSepsis.setsOFASalida(sOFASalida);
		 
		quickSOFASalida = evaluacionSepsis.evaluarQuickSOFA(_parametrosAEvaluarSepsis);
		resultadoEvaluacionSepsis.setQuickSOFASalida(quickSOFASalida);
		
		
		//resultadoEvaluacionSepsis.estableceUnidadesSOFA();
	  }
	  catch(ExcepcionServicioSepsis ess)
	  { 
		resultadoEvaluacionSepsis.setMensajeError(ess.getMensajeError());
		objLog.debug("************ Error en evaluarParametrosSepsis: " + resultadoEvaluacionSepsis.toString());      	  
	  }
	  
	  return resultadoEvaluacionSepsis; 
	}
	
	
	
	
}	
	