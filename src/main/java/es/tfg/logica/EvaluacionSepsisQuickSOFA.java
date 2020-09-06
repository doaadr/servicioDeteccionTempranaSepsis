package es.tfg.logica;

import org.apache.log4j.Logger;

import es.tfg.beans.ParametrosAEvaluarSepsis;
import es.tfg.beans.QuickSOFAEntrada;
import es.tfg.beans.QuickSOFASalida;
import excepciones.ExcepcionServicioSepsis;
import excepciones.IExcepcionServicioSepsis;

public class EvaluacionSepsisQuickSOFA implements IExcepcionServicioSepsis 
{
	private QuickSOFAEntrada quickSOFAEntrada;
	private QuickSOFASalida  quickSOFASalida;	
	private static Logger objLog =  Logger.getLogger(EvaluacionSepsisQuickSOFA.class.getName());
	
  public EvaluacionSepsisQuickSOFA()  {}
  
  public EvaluacionSepsisQuickSOFA(ParametrosAEvaluarSepsis parametrosAEvaluarSepsis)
  {
	super();
	asignarParametrosSepsisQSOFA(parametrosAEvaluarSepsis);
  }
  
  
	public void evaluarEscalaQuickSOFA() throws ExcepcionServicioSepsis
	{
		
	 // respiracion.frecuenciaRespiratoria
	 establecerEvaluacionQuickSOFAFrecuenciaRespiratoria(); 
	
	 // ## [Datos Cardio] - Presion arterialSistolica
	 establecerEvaluacionDatosCardioPresionArterial();
	  
	 // ##[Estado Mental] - Aterado
	 establecerEvaluacionEstadoMentalAlterado();
	 
	  /* 
	 		 1 - frecuencia respiratoria >= 22
			 1 - estado mental alterado
			 1 - presión arterial sistolica < 100mmHg

			 <  2 puntos bajo riesgo
			 >= 2 puntos alto riesgo
	  */		 
	}
	
	// Frecuencia respiratoria 1 - >= 22 rpm
	private void establecerEvaluacionQuickSOFAFrecuenciaRespiratoria() throws ExcepcionServicioSepsis
	{
	  String quickSOFAfrecuenciaRespiratoria 		  		    = null;
	  int    iQuickSOFAFrecuenciaRespiratoria		  		    = 0;
	  int	 iRangoQuickSOFAFrecuenciaRespiratoria			    = 0;
	  int    valorMaxPonderacionQuickSOFAFrecuenciaRespiratoria = 0;
	  int	 valoracionQuickSOFAFrecuenciaRespiratoria 	   	 	= 0;
	  String sValoracionQuickSOFAFrecuenciaRespiratoria	   		= null;
	   
	  quickSOFAfrecuenciaRespiratoria = getQuickSOFAEntrada().getRespiracion_FrecuenciaRespiratoriaRPM();
	  valorMaxPonderacionQuickSOFAFrecuenciaRespiratoria = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
									PonderacionVariablesClinicas.QUICKSOFA_FRECUENCIA_RESPIRATORIA));
	  
	  objLog.debug("QuickSOFA frecuencia respiratoria: " + quickSOFAfrecuenciaRespiratoria);
	  objLog.debug("QuickSOFA valorMaxPonderacionQuickSOFAFrecuenciaRespiratoria: " + valorMaxPonderacionQuickSOFAFrecuenciaRespiratoria);
	  
	  try
	  {  
		if ( (quickSOFAfrecuenciaRespiratoria != null) && (!quickSOFAfrecuenciaRespiratoria.equals("")) )  
		{ 	
		  iQuickSOFAFrecuenciaRespiratoria = Integer.parseInt(quickSOFAfrecuenciaRespiratoria);
		  if (iQuickSOFAFrecuenciaRespiratoria >= 22) iRangoQuickSOFAFrecuenciaRespiratoria = 1;
		}
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { 
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_FRECUENCIA_RESPIRATORIA_QUICKSOFA);  
	  }
	  
	  valoracionQuickSOFAFrecuenciaRespiratoria = (valorMaxPonderacionQuickSOFAFrecuenciaRespiratoria * iRangoQuickSOFAFrecuenciaRespiratoria);
	  sValoracionQuickSOFAFrecuenciaRespiratoria = String.valueOf(valoracionQuickSOFAFrecuenciaRespiratoria);
	  
	  getQuickSOFASalida().setValoracionFrecuenciaRespiratoria(sValoracionQuickSOFAFrecuenciaRespiratoria);
	 
	}
	
	 
	
  
	// Datos Cardio - Presion Arterial < 100 mmHg - 1
 	private void establecerEvaluacionDatosCardioPresionArterial() throws ExcepcionServicioSepsis
	{
	  String quickSOFAPresionArterial 		  		     = null;
	  int    iQuickSOFAPresionArterial		  		     = 0;
	  int	 iRangoQuickSOFAPresionArterial			     = 0;
	  int    valorMaxPonderacionQuickSOFAPresionArterial = 0;
	  int	 valoracionQuickSOFAPresionArterial 	   	 = 0;
	  String sValoracionQuickSOFAPresionArterial	   	 = null;
		   
	  quickSOFAPresionArterial = getQuickSOFAEntrada().getPresionArterialSistolica();
	  valorMaxPonderacionQuickSOFAPresionArterial = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
											PonderacionVariablesClinicas.QUICKSOFA_PRESION_ARTERIAL_SISTOLICA));
		  
	  objLog.debug("QuickSOFA presion arterial sistolica: " + quickSOFAPresionArterial);
	  objLog.debug("QuickSOFA valorMaxPonderacionQuickSOFAPresionArterial: " + valorMaxPonderacionQuickSOFAPresionArterial);
		  
	  try
	  {  
		if ( (quickSOFAPresionArterial != null) && (!quickSOFAPresionArterial.equals("")) )  
		{ 	
		  iQuickSOFAPresionArterial = Integer.parseInt(quickSOFAPresionArterial);
		  if (iQuickSOFAPresionArterial < 100) iRangoQuickSOFAPresionArterial = 1;
		}
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { 
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_PRESION_ARTERIAL_QUICKSOFA);  
	  }
		  
	  valoracionQuickSOFAPresionArterial = (valorMaxPonderacionQuickSOFAPresionArterial * iRangoQuickSOFAPresionArterial);
	  sValoracionQuickSOFAPresionArterial = String.valueOf(valoracionQuickSOFAPresionArterial);
		  
	  getQuickSOFASalida().setValoracionPresionArterialSistolica(sValoracionQuickSOFAPresionArterial);
		 
	}
	
	
	// establecerEvaluacionEstadoMentalAlterado
 	private void establecerEvaluacionEstadoMentalAlterado() throws ExcepcionServicioSepsis
	{
	  String quickSOFAEstadoMentalAlterado 		  		      = null;
	  int    iQuickSOFAEstadoMentalAlterado		  		      = 0;
	  int	 iRangoQuickSOFAEstadoMentalAlterado		      = 0;
	  int    valorMaxPonderacionQuickSOFAEstadoMentalAlterado = 0;
	  int	 valoracionQuickSOFAEstadoMentalAlterado  	   	  = 0;
	  String sValoracionQuickSOFAEstadoMentalAlterado	   	  = null;
		   
	  quickSOFAEstadoMentalAlterado = getQuickSOFAEntrada().getEstadoMentalAlterado();
	  valorMaxPonderacionQuickSOFAEstadoMentalAlterado = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
											PonderacionVariablesClinicas.QUICKSOFA_ESTADO_MENTAL_ALTERADO));
		  
	  objLog.debug("QuickSOFA estado mental alterado: " + quickSOFAEstadoMentalAlterado);
	  objLog.debug("QuickSOFA valorMaxPonderacionQuickSOFAPresionArterial: " + valorMaxPonderacionQuickSOFAEstadoMentalAlterado);
		  
	  try
	  {  
		if ( (quickSOFAEstadoMentalAlterado != null) && (!quickSOFAEstadoMentalAlterado.equals("")) )  
		{ 	
		  iQuickSOFAEstadoMentalAlterado = Integer.parseInt(quickSOFAEstadoMentalAlterado);
		  if (iQuickSOFAEstadoMentalAlterado == 1) iRangoQuickSOFAEstadoMentalAlterado = 1;
		}
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { 
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_ESTADO_MENTAL_ALTERADO_QUICKSOFA);  
	  }
		  
	  valoracionQuickSOFAEstadoMentalAlterado = (valorMaxPonderacionQuickSOFAEstadoMentalAlterado * iRangoQuickSOFAEstadoMentalAlterado);
	  sValoracionQuickSOFAEstadoMentalAlterado = String.valueOf(valoracionQuickSOFAEstadoMentalAlterado);
		  
	  getQuickSOFASalida().setValoracionEstadoMentalAlterado(sValoracionQuickSOFAEstadoMentalAlterado);
		 
	}
 	
 	
  
  
  private void asignarParametrosSepsisQSOFA(ParametrosAEvaluarSepsis parametrosAEvaluarSepsis)
  {
    this.setQuickSOFAEntrada(Mapeos.mapearDatosqSOFA(parametrosAEvaluarSepsis)); 
  }
  
  
  
  public QuickSOFAEntrada getQuickSOFAEntrada() {
		return quickSOFAEntrada;
	}

	public void setQuickSOFAEntrada(QuickSOFAEntrada quickSOFAEntrada) {
		this.quickSOFAEntrada = quickSOFAEntrada;
	}

	public QuickSOFASalida getQuickSOFASalida() 
	{   if (quickSOFASalida == null) quickSOFASalida = new QuickSOFASalida();
		return quickSOFASalida;
	}

	public void setQuickSOFASalida(QuickSOFASalida quickSOFASalida) {
		this.quickSOFASalida = quickSOFASalida;
	}
  
}
