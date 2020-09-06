package es.tfg.logica;

public interface IConstantesVariablesClinicas 
{ 
  // -------- CONSTANTES ASOCIADAS A LA ESCALA SOFA ----------
  public static final String RESPIRACION_FRECUENCIA_RESPIRATORIA = "respiracion.frecuenciaRespiratoria";
  public static final String COAGULACION_PLAQUETA 	= "coagulacion.plaqueta";
  public static final String HIGADO_BILIRRUBINA   	= "higado.bilirrubina";
  public static final String DATOS_CARDIO	      	= "datosCardio.total";
  public static final String DATOS_ESTADOMENTAL   	= "estadoMental.total";
  public static final String DATOS_RENAL	        = "renal.total";
  public static final String DATOSEXTERNOS_EXTERNO  = "datosExternos.datos_externo";
  
//-------- CONSTANTES ASOCIADAS A LA ESCALA QUICK SOFA ----------
  public static final String QUICKSOFA_FRECUENCIA_RESPIRATORIA 	  = "quickSOFA.frecuenciaRespiratoria";
  public static final String QUICKSOFA_PRESION_ARTERIAL_SISTOLICA = "quickSOFA.presionArterialSistolica";
  public static final String QUICKSOFA_ESTADO_MENTAL_ALTERADO 	  = "quickSOFA.estadoMentalAlterado";
 
}
