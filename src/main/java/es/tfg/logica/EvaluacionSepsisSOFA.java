package es.tfg.logica;

import org.apache.log4j.Logger;

import es.tfg.beans.DatoExterno;
import es.tfg.beans.DatosCardio;
import es.tfg.beans.ParametrosAEvaluarSepsis;
import es.tfg.beans.SOFAEntrada;
import es.tfg.beans.SOFASalida;
import excepciones.ExcepcionServicioSepsis;
import excepciones.IExcepcionServicioSepsis;

public class EvaluacionSepsisSOFA implements IExcepcionServicioSepsis
{	
	private static Logger objLog =  Logger.getLogger(EvaluacionSepsisSOFA.class.getName());
	
	SOFAEntrada sOFAEntrada;
	SOFASalida 	sOFASalida;
		
	public EvaluacionSepsisSOFA()  {}
	  
	public EvaluacionSepsisSOFA(ParametrosAEvaluarSepsis parametrosAEvaluarSepsis)
								throws ExcepcionServicioSepsis
	{
	  super();
	  evaluarParametrosSepsis(parametrosAEvaluarSepsis);
	  
	}
	
	
	public void evaluarEscalaSOFA() throws ExcepcionServicioSepsis
	{
	 // respiracion.frecuenciaRespiratoria
	 establecerEvaluacionFrecuenciaRespiratoria(); 
	 
	 // coagulacion.plaqueta
	 establecerEvaluacionCoagulacion();
	 
	 //  higado.bilirrubina
	 establecerEvaluacionHigado();
	 
	 // ## [Datos Cardio]
	 establecerEvaluacionDatosCardio();
	 
	  // ##[Estado Mental]
	 establecerEvaluacionEstadoMental();
	 
	 //renal.creatinina=
	 establecerEvaluacionRenal(); 
	 
	 // #[Datos Externos]
	 establecerEvaluacionDatoExterno();
	 //datosExternoss.datos_externo1=11 	
	  	
		  	
	}
	
	 
	
	private void establecerEvaluacionFrecuenciaRespiratoria() throws ExcepcionServicioSepsis
	{
	  String frecuenciaRespiratoria 		  		   = null;
	  int    iFrecuenciaRespiratoria		  		   = 0;
	  int	 iRangoFrecuenciaRespiratoria			   = 0;
	  int    valorMaxPonderacionFrecuenciaRespiratoria = 0;
	  int	 valoracionSOFAFrecuenciaRespiratoria 	   = 0;
	  String sValoracionSOFAFrecuenciaRespiratoria	   = null;
	   
	  frecuenciaRespiratoria = getsOFAEntrada().getRespiracion_FrecuenciaRespiratoria();
	  valorMaxPonderacionFrecuenciaRespiratoria = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
									PonderacionVariablesClinicas.RESPIRACION_FRECUENCIA_RESPIRATORIA));
	  
	  try
	  {  
		if ( (frecuenciaRespiratoria != null) && (!frecuenciaRespiratoria.equals("")) )  
		{ 	
		  iFrecuenciaRespiratoria = Integer.parseInt(frecuenciaRespiratoria);
		  // 0 - >400 | 1 - <= 400 | 2 - <= 300 | 3 - <= 200 | 4 - <= 100
		  if (iFrecuenciaRespiratoria > 400) iRangoFrecuenciaRespiratoria = 0;
		  if ( (iFrecuenciaRespiratoria <= 400) && 
			   (iFrecuenciaRespiratoria > 300) ) iRangoFrecuenciaRespiratoria = 1;
		  if ( (iFrecuenciaRespiratoria <= 300) && 
				   (iFrecuenciaRespiratoria > 200) ) iRangoFrecuenciaRespiratoria = 2;	  
		  if ( (iFrecuenciaRespiratoria <= 200) && 
				   (iFrecuenciaRespiratoria > 100) ) iRangoFrecuenciaRespiratoria = 3;	  
		  if (iFrecuenciaRespiratoria <= 100)  iRangoFrecuenciaRespiratoria = 4;
		}
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { 
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_FRECUENCIA_RESPIRATORIA);  
	  }
	  
	  valoracionSOFAFrecuenciaRespiratoria = (valorMaxPonderacionFrecuenciaRespiratoria * iRangoFrecuenciaRespiratoria) / 4;
	  sValoracionSOFAFrecuenciaRespiratoria = String.valueOf(valoracionSOFAFrecuenciaRespiratoria);
	  
	  getsOFASalida().setValoracionSOFAFrecuenciaRespiratoria(sValoracionSOFAFrecuenciaRespiratoria);
	 
	}
	
	
	
	private void establecerEvaluacionCoagulacion() throws ExcepcionServicioSepsis
	{
	  String sCoagulacionPlaquetaria		  		   = null;
	  int    iCoagulacionPlaquetaria		  		   = 0;
	  int	 iRangoCoagulacionPlaquetaria			   = 0;
	  int    valorMaxPonderacionCoagulacionPlaquetaria = 0;
	  int	 valoracionSOFACoagulacionPlaquetaria 	   = 0;
	  String sValoracionSOFACoagulacionPlaquetaria	   = null;
	  
	  sCoagulacionPlaquetaria = getsOFAEntrada().getCoagulacion_Plaqueta();
	  valorMaxPonderacionCoagulacionPlaquetaria = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
												  PonderacionVariablesClinicas.COAGULACION_PLAQUETA));
	   
	  try
	  { 
		if ( (sCoagulacionPlaquetaria != null) && (!sCoagulacionPlaquetaria.equals("")) )  
		{  
		  iCoagulacionPlaquetaria = Integer.parseInt(sCoagulacionPlaquetaria);
		  // 0 - >150 | 1 - <= 150 | 2 - <= 100 | 3 - <= 50 | 4 - <= 20
		  if (iCoagulacionPlaquetaria > 150) iRangoCoagulacionPlaquetaria = 0;
		  if ( (iCoagulacionPlaquetaria <= 150) && 
			   (iCoagulacionPlaquetaria > 100) ) iRangoCoagulacionPlaquetaria = 1;
		  if ( (iCoagulacionPlaquetaria <= 100) && 
				   (iCoagulacionPlaquetaria > 50) ) iRangoCoagulacionPlaquetaria = 2;	  
		  if ( (iCoagulacionPlaquetaria <= 50) && 
				   (iCoagulacionPlaquetaria > 20) ) iRangoCoagulacionPlaquetaria = 3;	  
		  if (iCoagulacionPlaquetaria <= 20)  iRangoCoagulacionPlaquetaria = 4;
		}
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { 
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_COAGULACION_PLAQUETARIA);  
	  }
	  
	  valoracionSOFACoagulacionPlaquetaria = (valorMaxPonderacionCoagulacionPlaquetaria * iRangoCoagulacionPlaquetaria) / 4;
	  
	  sValoracionSOFACoagulacionPlaquetaria = String.valueOf(valoracionSOFACoagulacionPlaquetaria);
	  getsOFASalida().setValoracionSOFACoagulacionPlaquetaria(sValoracionSOFACoagulacionPlaquetaria);
	 
	}
		
	
	private void establecerEvaluacionHigado() throws ExcepcionServicioSepsis
	{
	  String sHigadoBilirrubina				  	   = null;
	  float  fHigadoBilirrubina		  		   	   = 0;
	  int	 iRangosHigadoBilirrubina			   = 0;
	  int    valorMaxPonderacionsHigadoBilirrubina = 0;
	  int	 valoracionSOFAsHigadoBilirrubina 	   = 0;
	  String sValoracionSOFAsHigadoBilirrubina	   = null;
	  
	  sHigadoBilirrubina = getsOFAEntrada().getHigado_Bilirrubina();
	  valorMaxPonderacionsHigadoBilirrubina = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
											  PonderacionVariablesClinicas.HIGADO_BILIRRUBINA));
	  
	  try
	  { 
		if ( (sHigadoBilirrubina != null) && (!sHigadoBilirrubina.equals("")) )   
		{	
		  fHigadoBilirrubina = (sHigadoBilirrubina == null) ? 0 : Float.parseFloat(sHigadoBilirrubina);
				
		  // 0 - < 1.2 | 1 - <= 1.9 | 2 - <= 5.9 | 3 - <= 11.9 | 4 - < 12
		  if (fHigadoBilirrubina < 1.2) iRangosHigadoBilirrubina = 0;
		  if ( (fHigadoBilirrubina <= 1.9) && 
		       (fHigadoBilirrubina >= 1.2) ) iRangosHigadoBilirrubina = 1;
		  if ( (fHigadoBilirrubina <= 5.9) && 
			   (fHigadoBilirrubina > 1.9) ) iRangosHigadoBilirrubina = 2;	  
		  if ( (fHigadoBilirrubina <= 11.9) && 
		       (fHigadoBilirrubina > 5.9) ) iRangosHigadoBilirrubina = 3;	  
		  if (fHigadoBilirrubina >= 12)  iRangosHigadoBilirrubina = 4;
		}
		
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { 
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_HIGADO_BILIRRUBINA);  
	  }
	  	        
	  valoracionSOFAsHigadoBilirrubina = (valorMaxPonderacionsHigadoBilirrubina * iRangosHigadoBilirrubina) / 4;
	
	  sValoracionSOFAsHigadoBilirrubina = String.valueOf(valoracionSOFAsHigadoBilirrubina);
	  getsOFASalida().setValoracionSOFAHigadoBilirrubina(sValoracionSOFAsHigadoBilirrubina); 
	 
	}
	
	
	
	// ## [Datos Cardio]
	// datosCardio.presionArterialSistolica=4
	// datosCardio.epinefrina=5
	// datosCardio.epinefrina.norepinefrina=6
	// datosCardio.epinefrina.dobutamina=7
	private void establecerEvaluacionDatosCardio() throws ExcepcionServicioSepsis
	{
	  int     valorMaxPonderacionsDatosCardio = 0;
	  Integer valoracionSOFAsDatosCardio 	  = null;
	  String  sValoracionSOFAsDatosCardio	  = null;	
	   
	  // 1 - PAM < 70mmHg
	  // 2 - Dopamina <= 5 
	  //	 Dobutamina
	  // 3 - Dopamina > 5 < 15 OR
	  // 	 Epinefrina <= 0.1 OR
	  //	 Noreprinefina <= 0.1	
	  // 4 - Dopamina >= 15    OR
	  //	 Epinefrina > 0.1  OR
	  // 	 Noreprinefina > 0.1
	 
	 validarFormatoParametrosCardio(getsOFAEntrada().getDatosCardio());
	 
	 try
	 { 
		valorMaxPonderacionsDatosCardio = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
														PonderacionVariablesClinicas.DATOS_CARDIO));
		objLog.info("***** Valor valorMaxPonderacionsDatosCardio: "+ valorMaxPonderacionsDatosCardio); 
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { 
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_MAX_PONDER_CARDIO);  
	  }
	
	valoracionSOFAsDatosCardio = new Integer(0);
	 
	// Presion arterial sistolica 
	valoracionSOFAsDatosCardio = calculoPonderacionPresionArterialSistolica(valoracionSOFAsDatosCardio); 
	   
	 // Dobutamina
	valoracionSOFAsDatosCardio = calculoPonderacionoDobutamina(valoracionSOFAsDatosCardio);
	
	 // Epinefrina 
	valoracionSOFAsDatosCardio = calculoPonderacionEpinefrina(valoracionSOFAsDatosCardio);
	
	 // Norepinefrina 
	valoracionSOFAsDatosCardio = calculoPonderacionNorepinefrina(valoracionSOFAsDatosCardio);
	
	// Dopamina
	valoracionSOFAsDatosCardio = calculoPonderacionDopamina(valoracionSOFAsDatosCardio);
	
	sValoracionSOFAsDatosCardio = String.valueOf(valoracionSOFAsDatosCardio);
	this.getsOFASalida().setValoracionSOFADatosCardio(sValoracionSOFAsDatosCardio);
	  
	 
	}
	
	
	
	// 1 - PAM < 70mmHg
	private Integer calculoPonderacionPresionArterialSistolica(Integer valoracionSOFAsDatosCardio)
	{ 
	  String sPAM = null;
	  float  fPAM = 0; 	
	  
	  // 1 - PAM < 70mmHg	 
	  sPAM = this.getsOFAEntrada().getDatosCardio().getPresionArterialSistolica();
	  if ( (sPAM != null) && (!sPAM.equals("")) ) 
	  {
		fPAM = Float.parseFloat(sPAM);
		if (fPAM < 70) 
		{	valoracionSOFAsDatosCardio = 1;
			this.getsOFASalida().getDatosCardio().setPresionArterialSistolica("1"); 
		}
	  }	
	  return valoracionSOFAsDatosCardio;
	}
	
	    
	// 2 - Prescripcion de dobutamina a cualquier dosis
	private Integer calculoPonderacionoDobutamina(Integer valoracionSOFAsDatosCardio)
	{  
	  String  sDobutamina = null;
	  int	  iDobutamina = 0;
	  
	  sDobutamina = this.getsOFAEntrada().getDatosCardio().getDobutamina();
	  if ( (sDobutamina != null) && (!sDobutamina.equals("")) )  
	  {
		iDobutamina = Integer.parseInt(sDobutamina);
		if (iDobutamina == 1) 
		{	if (valoracionSOFAsDatosCardio < 2) valoracionSOFAsDatosCardio = 2;
			this.getsOFASalida().getDatosCardio().setDobutamina("2"); 
		}
	  }		  
	  return valoracionSOFAsDatosCardio;
	}
	
	
	
	// Epinefrina
	// 3 - Epinefrina <= 0.1 OR
	// 4 - Epinefrina > 0.1  OR
	private Integer calculoPonderacionEpinefrina(Integer valoracionSOFAsDatosCardio)
	{  
	  String  sEpinefrina		  	   		  = null;
	  float	  fEpinefrina	  		   	   	  = 0;
	  Integer nuevoValoracionSOFAsDatosCardio = 0;
		  
	  sEpinefrina = this.getsOFAEntrada().getDatosCardio().getEpinefrina();
	  if ( (sEpinefrina != null) && (!sEpinefrina.equals("")) )  
	  {
		fEpinefrina = Float.parseFloat(sEpinefrina);
		if ( (fEpinefrina <= 0.1) && (fEpinefrina > 0) ) nuevoValoracionSOFAsDatosCardio = 3;
		if (fEpinefrina > 0.1)  nuevoValoracionSOFAsDatosCardio = 4;
		
		if (nuevoValoracionSOFAsDatosCardio > valoracionSOFAsDatosCardio) 
		{
		  valoracionSOFAsDatosCardio = nuevoValoracionSOFAsDatosCardio;
		} 
 
		this.getsOFASalida().getDatosCardio().setEpinefrina(String.valueOf(nuevoValoracionSOFAsDatosCardio));
	  }		  
	  return valoracionSOFAsDatosCardio;
	}
	
	
	// Norepinefrina
	// 3 - Epinefrina <= 0.1 OR
	// 4 - Epinefrina > 0.1  OR
	private Integer calculoPonderacionNorepinefrina(Integer valoracionSOFAsDatosCardio)
	{  
	  String  sNorepinefrina		  	   	  = null;
	  float	  fNorepinefrina	  		   	  = 0;
	  Integer nuevoValoracionSOFAsDatosCardio = 0;
		  
	  sNorepinefrina = this.getsOFAEntrada().getDatosCardio().getNorepinefrina();
	  if ( (sNorepinefrina != null) && (!sNorepinefrina.equals("")) ) 
	  {
		fNorepinefrina = Float.parseFloat(sNorepinefrina);
		if ( (fNorepinefrina <= 0.1) && (fNorepinefrina > 0) ) nuevoValoracionSOFAsDatosCardio = 3;
		if (fNorepinefrina > 0.1)  nuevoValoracionSOFAsDatosCardio = 4;
		
		if (nuevoValoracionSOFAsDatosCardio > valoracionSOFAsDatosCardio) 
		{
		  valoracionSOFAsDatosCardio = nuevoValoracionSOFAsDatosCardio;
		} 
 
		this.getsOFASalida().getDatosCardio().setNorepinefrina(String.valueOf(nuevoValoracionSOFAsDatosCardio));
	  }		  
	  return valoracionSOFAsDatosCardio;
	}
	
	
	// Dopamina
	// 2 - Dopamina <= 5 
	// 3 - Dopamina > 5 < 15 
	// 4 - Dopamina >= 15    
	private Integer calculoPonderacionDopamina(Integer valoracionSOFAsDatosCardio)
	{  
	  String  sDopamina		  	   		  = null;
	  float	  fDopamina	  		   	   	  = 0;
	  Integer nuevoValoracionSOFAsDatosCardio = 0;
		  
	  sDopamina = this.getsOFAEntrada().getDatosCardio().getDopamina();
	  if ( (sDopamina != null) && (!sDopamina.equals("")) )  
	  {
		fDopamina = Float.parseFloat(sDopamina);
		if ( (fDopamina <= 5) && (fDopamina > 0) )  nuevoValoracionSOFAsDatosCardio = 2;
		if ( (fDopamina > 5) && (fDopamina <= 15) ) nuevoValoracionSOFAsDatosCardio = 3;
		if ( fDopamina > 15)  nuevoValoracionSOFAsDatosCardio = 4;
		
		if (nuevoValoracionSOFAsDatosCardio > valoracionSOFAsDatosCardio) 
		{
		  valoracionSOFAsDatosCardio = nuevoValoracionSOFAsDatosCardio;
		} 
 
		this.getsOFASalida().getDatosCardio().setDopamina(String.valueOf(nuevoValoracionSOFAsDatosCardio));
	  }		  
	  return valoracionSOFAsDatosCardio;
	}

	
	
	
	  // 1 - PAM < 70mmHg
	  // 2 - Dopamina <= 5 
	  //	 Dobutamina
	  // 3 - Dopamina > 5 < 15 OR
	  // 	 Epinefrina <= 0.1 OR
	  //	 Noreprinefina <= 0.1	
	  // 4 - Dopamina >= 15    OR
	  //	 Epinefrina > 0.1  OR
	  // 	 Noreprinefina > 0.1
	
	private void validarFormatoParametrosCardio(DatosCardio datosCardio) throws ExcepcionServicioSepsis	
	{
	  String sDobutamina 	= null;
	  String sEpinefrina 	= null;
	  String sNorepinefrina = null;
	  String sPAM			= null;
	  String sDopamina		= null;
	  
	  sDobutamina 	 = datosCardio.getDobutamina();
	  sEpinefrina 	 = datosCardio.getEpinefrina();
	  sNorepinefrina = datosCardio.getNorepinefrina();
	  sPAM		  	 = datosCardio.getPresionArterialSistolica();
	  sDopamina		 = datosCardio.getDopamina();
	
	 // Dobutamina 
	  try
	  { 
	    if ( (sDobutamina != null) && (!sDobutamina.equals("")) ) Integer.parseInt(sDobutamina);
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { throw new ExcepcionServicioSepsis(ERROR_FORMATO_CARDIO_DOBUTAMINA); } 
	  
	  // Epinefrina 
	  try
	  { 
	    if ((sEpinefrina != null) && (!sEpinefrina.equals("")) ) Float.parseFloat(sEpinefrina);
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { throw new ExcepcionServicioSepsis(ERROR_FORMATO_CARDIO_EPINEFRINA); }	  
	  
	  // Norepinefrina 
	  try
	  { 
		if ( (sNorepinefrina != null) && (!sNorepinefrina.equals("")) ) Float.parseFloat(sNorepinefrina);
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { throw new ExcepcionServicioSepsis(ERROR_FORMATO_CARDIO_NOREPINEFRINA); }
	   
	  // Presion arterial sistolica 
	  try
	  { 
		if ( (sPAM != null) && (!sPAM.equals("")) )Float.parseFloat(sPAM);
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { throw new ExcepcionServicioSepsis(ERROR_FORMATO_CARDIO_PAM); }
	  
	  // Dopamina
	  try
	  { 
		if ( (sDopamina != null) && (!sDopamina.equals("")) ) Float.parseFloat(sDopamina);
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { throw new ExcepcionServicioSepsis(ERROR_FORMATO_CARDIO_DOPAMINA); }
	  
	  
	}
	
	//##[Estado Mental]
	//estadoMental.total
	private void establecerEvaluacionEstadoMental() throws ExcepcionServicioSepsis
	{ 
	  String sEscalaGlasgow 	   		 	 = null;
	  Float	 fEscalaGlasgow		   		 	 = null;
	  int 	 iRangoEstadoMental   		 	 = 0;
	  int  	 valoracionSOFAEstadoMental  	 = 0;
	  int	 valorMaxPonderacionEstadoMental = 0;
	  String sValoracionSOFAEstadoMental 	 = null;
	  
	  // Estado mental - escala Glasgow 
	  // 0 = > 15 | 1 = 13-14 | 2 = 10-12 | 3 = 6-9 | 4 = < 6
	  sEscalaGlasgow = getsOFAEntrada().getEstadoMental().getResultadoEscalaGlasgow();
	  try
	  { 
		if ( (sEscalaGlasgow != null) && (!sEscalaGlasgow.equals("")) ) 
		{	
		  fEscalaGlasgow = Float.parseFloat(sEscalaGlasgow);
		  valorMaxPonderacionEstadoMental = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
					PonderacionVariablesClinicas.DATOS_ESTADOMENTAL));
		    
		  if (fEscalaGlasgow >= 15) iRangoEstadoMental = 0;
		  if ( (fEscalaGlasgow < 15) && 
			   (fEscalaGlasgow >= 13) ) iRangoEstadoMental = 1;
		  if ( (fEscalaGlasgow < 13) && 
			   (fEscalaGlasgow > 10) ) iRangoEstadoMental = 2;	  
		  if ( (fEscalaGlasgow < 10) && 
			   (fEscalaGlasgow >= 6) ) iRangoEstadoMental = 3;	  
		  if (fEscalaGlasgow < 6)  iRangoEstadoMental = 4;
		   
		  valoracionSOFAEstadoMental  = (valorMaxPonderacionEstadoMental * iRangoEstadoMental) / 4;
		  sValoracionSOFAEstadoMental = String.valueOf(valoracionSOFAEstadoMental);
		}
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { throw new ExcepcionServicioSepsis(ERROR_FORMATO_ESTMENTAL_GLASGOW); }  
	 	  
	  getsOFASalida().setValoracionEstadoMental(sValoracionSOFAEstadoMental);
	  getsOFASalida().getEstadoMental().setResultadoEscalaGlasgow(sValoracionSOFAEstadoMental);
	  
	}  
		
	
	//establecerEvaluacionRenal
	// 0 - Creatinina < 1.2
	// 1 - Creatininia entre 1.2 - 1.9
	// 2 - Creatinina entre 2 - 3.4
	// 3 - Creatinina entre 3.5 - 4.9 OR
	//     uresis / flujo < 500 ml /dia
	// 4 - Creatinina > 5
	//     uresis / flujo < 200 ml / dia

	private void establecerEvaluacionRenal() throws ExcepcionServicioSepsis
	{ 
	  String sRenalCreatinina 	   		 	 = null;
	  Float	 fRenalCreatinina	   		 	 = null;
	  String sRenalUresis	 	   		 	 = null;
	  Float	 fRenalUresis		   		 	 = null;
	  int 	 iRangoRenal					 = 0;
	  int 	 iRangoRenalCreatinina		 	 = 0;
	  int 	 iRangoRenalUresis			 	 = 0;
	  int  	 valoracionSOFARenal		 	 = 0;
	  int	 valorMaxPonderacionRenal 		 = 0;
	  String sValoracionSOFARenal 	 		 = null;
	  String sValoracionSOFARenalCreatinina  = null;
	  String sValoracionSOFARenalUresis		 = null;
	  
	  valorMaxPonderacionRenal = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
				PonderacionVariablesClinicas.DATOS_RENAL));
	  
	  // Creatinina
	  sRenalCreatinina = getsOFAEntrada().getDatosRenales().getRenal_Creatinina();
	  try
	  { 
		if ( (sRenalCreatinina != null) && (!sRenalCreatinina.equals("")) ) 
		{	
		  fRenalCreatinina = Float.parseFloat(sRenalCreatinina);
		
		  if (fRenalCreatinina < 1.2) iRangoRenalCreatinina = 0;
		  if ( (fRenalCreatinina < 2) && 
			   (fRenalCreatinina >= 1.2) ) iRangoRenalCreatinina = 1;
		  if ( (fRenalCreatinina < 3.5) && 
			   (fRenalCreatinina >= 2) ) iRangoRenalCreatinina = 2;	  
		  if ( (fRenalCreatinina < 5) && 
			   (fRenalCreatinina >= 3.5) ) iRangoRenalCreatinina = 3;	  
		  if (fRenalCreatinina >= 5)  iRangoRenalCreatinina = 4;
		}
		
		iRangoRenal = iRangoRenalCreatinina;
		sValoracionSOFARenalCreatinina = String.valueOf(iRangoRenalCreatinina);
		getsOFASalida().getDatosRenales().setRenal_Creatinina(sValoracionSOFARenalCreatinina);
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { throw new ExcepcionServicioSepsis(ERROR_FORMATO_RENAL_CREATININA); }  
	  
	 sRenalUresis = getsOFAEntrada().getDatosRenales().getRenal_FlujoUrinario();
	 try
	 { 
	   if ( (sRenalUresis != null) && (!sRenalUresis.equals("")) ) 
	   {	
		 fRenalUresis = Float.parseFloat(sRenalUresis);
		 	
		 if (fRenalUresis >= 500) iRangoRenalUresis = 0;
		 if ( (fRenalUresis < 500) && 
		    (fRenalUresis >= 200) ) iRangoRenalUresis = 3;
		 if (fRenalUresis < 200)  iRangoRenalUresis = 4;
	    }
		
	   sValoracionSOFARenalUresis = String.valueOf(iRangoRenalUresis);
	   getsOFASalida().getDatosRenales().setRenal_FlujoUrinario(sValoracionSOFARenalUresis);
		
	   iRangoRenal = ( iRangoRenal < iRangoRenalUresis) ? iRangoRenalUresis : iRangoRenal;
		
	 } 
	 catch( NumberFormatException  numberFormatException)
	 { throw new ExcepcionServicioSepsis(ERROR_FORMATO_RENAL_URESIS); }
	
	  valoracionSOFARenal  = (valorMaxPonderacionRenal * iRangoRenal) / 4;
	  sValoracionSOFARenal = String.valueOf(valoracionSOFARenal);
	  
	  getsOFASalida().setValoracionSOFARenal(sValoracionSOFARenal);
	 
	}
	
	
	
	private void establecerEvaluacionDatoExterno() throws ExcepcionServicioSepsis
	{
	  int    	  valorMaxPonderacionDatosExterno = 0;
	  int	 	  valoracionSOFADatoExterno 	  = 0;
	  String 	  sValoracionSOFADatoExterno	  = null;
	  DatoExterno datosExterno 			 		  = null;
	  String	  sValorDatoExterno				  = null;
	  String	  sLimiteDatoExterno			  = null;
	  Integer	  iValorDatoExterno				  = null;
	  Integer	  iLimiteDatoExterno			  = null;
	  Integer	  iResultadoValoracionDatoExterno = null;
	  String	  sOperacionDatoExterno			  = null;
	  TiposOperacion tipoOperacion 			  	  = null;
	  IEjecucionObtencionDatoExterno iEjecucionObtencionDatoExterno = null;
	  
	  valorMaxPonderacionDatosExterno = Integer.parseInt(PonderacionVariablesClinicas.damePonderacionDeVariablesClinicas(
										PonderacionVariablesClinicas.DATOSEXTERNOS_EXTERNO));
	  
	  datosExterno 		 	= getsOFAEntrada().getDatoExterno();
	  sValorDatoExterno  	= datosExterno.getValorDatoExterno();
	  sLimiteDatoExterno    = datosExterno.getValorLimiteDatoExterno();
	  
	  try
	  { 
		if ( (datosExterno != null) && (!datosExterno.equals("")) && 
			 (sLimiteDatoExterno != null) && (!sLimiteDatoExterno.equals(""))
		    ) 
		{  
		  iValorDatoExterno = Integer.valueOf(sValorDatoExterno);
	      iLimiteDatoExterno = Integer.valueOf(sLimiteDatoExterno);
		}	  
		
		sOperacionDatoExterno = datosExterno.getOperacion();
		tipoOperacion = TiposOperacion.dameEnum(sOperacionDatoExterno);
		iEjecucionObtencionDatoExterno  = new ImplementacionDatoExternoPorDefecto();
		iResultadoValoracionDatoExterno =  iEjecucionObtencionDatoExterno.obtenerDatoExterno(iValorDatoExterno, 
				 																			  tipoOperacion, 
				 																			  iLimiteDatoExterno);
		  
		 valoracionSOFADatoExterno = (valorMaxPonderacionDatosExterno * iResultadoValoracionDatoExterno) / 4;
		 sValoracionSOFADatoExterno = String.valueOf(valoracionSOFADatoExterno);
	  } 
	  catch( NumberFormatException  numberFormatException)
	  { 
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_DATO_EXTERNO);  
	  }
	  catch(IllegalArgumentException iae)
	  {
		throw new ExcepcionServicioSepsis(ERROR_FORMATO_OPERACIONDATO_EXTERNO);  	 	 
	  } 
		  
	 getsOFASalida().setValoracionDatoExterno(sValoracionSOFADatoExterno);
	  	
	}
	
	
	
	private void evaluarParametrosSepsis(ParametrosAEvaluarSepsis _parametrosAEvaluarSepsis)
			throws ExcepcionServicioSepsis	
	{	
      this.setsOFAEntrada(Mapeos.mapearDatosSOFA(_parametrosAEvaluarSepsis));
	}
	
	
	public SOFAEntrada getsOFAEntrada() {
		return sOFAEntrada;
	}

	public void setsOFAEntrada(SOFAEntrada sOFAEntrada) {
		this.sOFAEntrada = sOFAEntrada;
	}

	public SOFASalida getsOFASalida() {
		if (sOFASalida == null) sOFASalida = new SOFASalida();
		return sOFASalida;
	}

	public void setsOFASalida(SOFASalida sOFASalida) {
		this.sOFASalida = sOFASalida;
	}

}
