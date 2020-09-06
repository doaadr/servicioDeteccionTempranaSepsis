package es.tfg.logica;

import java.util.HashMap;
import java.util.ResourceBundle;

 
public class PonderacionVariablesClinicas implements IConstantesVariablesClinicas
{
	private static ResourceBundle 		   ficheroCodificacionVariables;
	private static HashMap<String,String>  mapaValoresPonderacionVarClinicas;
	
	
	public static String damePonderacionDeVariablesClinicas(String variable)
	{ 
	  String ponderacion = null;
		
	  if (mapaValoresPonderacionVarClinicas == null) cargarPonderacionesVariablesSOFA();
	  
	  ponderacion = mapaValoresPonderacionVarClinicas.get(variable);
	   
	  return ponderacion;
	}
	
	
	/**
	 * Se implementa asi para posteriormente poder hacer un posible acceso desde base de datos
	 */
	private static void cargarPonderacionesVariablesSOFA()
	{	
	   if (mapaValoresPonderacionVarClinicas == null) 
	   {   
		 mapaValoresPonderacionVarClinicas = new HashMap<String, String> ();
	   }
		
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.RESPIRACION_FRECUENCIA_RESPIRATORIA, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.RESPIRACION_FRECUENCIA_RESPIRATORIA)
			   );
	   
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.COAGULACION_PLAQUETA, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.COAGULACION_PLAQUETA)
			   );
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.HIGADO_BILIRRUBINA, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.HIGADO_BILIRRUBINA)
			   );
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.DATOS_CARDIO, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.DATOS_CARDIO)
			   );
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.DATOS_ESTADOMENTAL, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.DATOS_ESTADOMENTAL)
			   );
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.DATOS_RENAL, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.DATOS_RENAL)
			   );
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.DATOSEXTERNOS_EXTERNO, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.DATOSEXTERNOS_EXTERNO)
			   );
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.QUICKSOFA_FRECUENCIA_RESPIRATORIA, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.QUICKSOFA_FRECUENCIA_RESPIRATORIA)
			   );
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.QUICKSOFA_PRESION_ARTERIAL_SISTOLICA, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.QUICKSOFA_PRESION_ARTERIAL_SISTOLICA)
			   );
	   
	   mapaValoresPonderacionVarClinicas.put(
			   PonderacionVariablesClinicas.QUICKSOFA_ESTADO_MENTAL_ALTERADO, 
			   getValorFicheroCodificacionVariables(PonderacionVariablesClinicas.QUICKSOFA_ESTADO_MENTAL_ALTERADO)
			   );
	
	}	
	  
	
	private static String getValorFicheroCodificacionVariables(String variable) 
	{ String ponderacionDelaVariable = null; 
	 	
	  try
	  {
		if(ficheroCodificacionVariables == null)
		{
		  ficheroCodificacionVariables = ResourceBundle.getBundle("conf/variablesClinicas");	
		}
		
		ponderacionDelaVariable = ficheroCodificacionVariables.getString(variable);
		
	  }catch(Exception ex)
	  { ex.printStackTrace(); } 	
	  
	  return ponderacionDelaVariable;
	}

}
