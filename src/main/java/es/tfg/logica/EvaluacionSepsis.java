package es.tfg.logica;


import org.apache.log4j.Logger;

import es.tfg.beans.ParametrosAEvaluarSepsis;
import es.tfg.beans.QuickSOFASalida;
import es.tfg.beans.ResultadoEvaluacionSepsis;
import es.tfg.beans.SOFASalida;
import excepciones.ExcepcionServicioSepsis;
  
public class EvaluacionSepsis 
{	
	private static Logger objLog =  Logger.getLogger(EvaluacionSepsis.class.getName());
	private ResultadoEvaluacionSepsis resultadoEvaluacionSepsis = null;
	
    public SOFASalida evaluarSOFA(ParametrosAEvaluarSepsis parametrosAEvaluarSepsis) throws ExcepcionServicioSepsis
   { 
     EvaluacionSepsisSOFA evaluacionSepsisSOFA = null;
     SOFASalida			  sOFASalida		   = null;
	 
	 evaluacionSepsisSOFA = new EvaluacionSepsisSOFA(parametrosAEvaluarSepsis);
	 
	 evaluacionSepsisSOFA.evaluarEscalaSOFA();
	 
	 sOFASalida = evaluacionSepsisSOFA.getsOFASalida();
	 
	 return sOFASalida;
   }
    
   
   
   public QuickSOFASalida evaluarQuickSOFA(ParametrosAEvaluarSepsis parametrosAEvaluarSepsis) throws ExcepcionServicioSepsis
   {
	 EvaluacionSepsisQuickSOFA evaluacionSepsisQuickSOFA = null;
     QuickSOFASalida		   quickSOFASalida		   	 = null;
		 
     evaluacionSepsisQuickSOFA = new EvaluacionSepsisQuickSOFA(parametrosAEvaluarSepsis);
		 
     evaluacionSepsisQuickSOFA.evaluarEscalaQuickSOFA();
		 
     quickSOFASalida = evaluacionSepsisQuickSOFA.getQuickSOFASalida();
		 
	 return quickSOFASalida;  
     	   
   }
   
   

	public ResultadoEvaluacionSepsis getResultadoEvaluacionSepsis() {
		return resultadoEvaluacionSepsis;
	}

	public void setResultadoEvaluacionSepsis(ResultadoEvaluacionSepsis resultadoEvaluacionSepsis) {
		this.resultadoEvaluacionSepsis = resultadoEvaluacionSepsis;
	}
	
}
