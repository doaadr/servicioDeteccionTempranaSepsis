package es.tfg.beans;

public class ResultadoEvaluacionSepsis 
{ 
	private String 		 	codigoEvaluacionSepsis;
	private String 		 	descripcionEvaluacionSepsis; 
	private SOFASalida   	sOFASalida;
	private QuickSOFASalida quickSOFASalida;
	private MensajeError 	mensajeError;
	 
	public String toString()
	{
	  StringBuffer sbResultadoEvaluacionSepsis;
	  
	  sbResultadoEvaluacionSepsis = new StringBuffer("[[ResultadoEvaluacionSepsis]] /n");
	  sbResultadoEvaluacionSepsis.append(" [MensajeError] Codigo error: ");
	  sbResultadoEvaluacionSepsis.append(mensajeError.getCodigoError());
	  sbResultadoEvaluacionSepsis.append("  Descripción error: ");
	  sbResultadoEvaluacionSepsis.append(mensajeError.getDescripcionError());
	  
	  return sbResultadoEvaluacionSepsis.toString();
	}
	
	public String getCodigoEvaluacionSepsis() {
		return codigoEvaluacionSepsis;
	}
	public void setCodigoEvaluacionSepsis(String _codigoEvaluacionSepsis) {
		this.codigoEvaluacionSepsis = _codigoEvaluacionSepsis;
	}
	
	public String getDescripcionEvaluacionSepsis() {
		return descripcionEvaluacionSepsis;
	}
	public void setDescripcionEvaluacionSepsis(String _descripcionEvaluacionSepsis) {
		this.descripcionEvaluacionSepsis = _descripcionEvaluacionSepsis;
	}
	
	public MensajeError getMensajeError() {
		return mensajeError;
	}
	public void setMensajeError(MensajeError mensajeError) {
		this.mensajeError = mensajeError;
	}
	
	public SOFASalida getsOFASalida() {
		return sOFASalida;
	}
	
	
	public void setsOFASalida(SOFASalida sOFASalida) {
		this.sOFASalida = sOFASalida;
	}
		
	
	public void estableceUnidadesSOFA() 
	{
	  String presionArterialSistolica = null;
	  String renalCreatinina		  = null;
	  String renalFlujoUrinario		  = null;
	  String higadoBilirrubina		  = null;
	  String coagulacionPlaquetaria	  = null;
	  String frecuenciaRespiratoria	  = null;
	  
	  presionArterialSistolica = sOFASalida.getDatosCardio().getPresionArterialSistolica() + " mm Hg";
	  renalCreatinina 		   = sOFASalida.getDatosRenales().getRenal_Creatinina() + " mg/dL";
	  renalFlujoUrinario 	   = sOFASalida.getDatosRenales().getRenal_FlujoUrinario() + " ml/dL";
	  higadoBilirrubina		   = sOFASalida.getValoracionSOFAHigadoBilirrubina() + " mg/dL";
	  coagulacionPlaquetaria   = sOFASalida.getValoracionSOFACoagulacionPlaquetaria() + " 10e3 /mm e3";
	  frecuenciaRespiratoria   = sOFASalida.getValoracionSOFAFrecuenciaRespiratoria() + " mm Hg";
	  
	  sOFASalida.getDatosCardio().setPresionArterialSistolica(presionArterialSistolica);
	  sOFASalida.getDatosRenales().setRenal_Creatinina(renalCreatinina);	
	  sOFASalida.getDatosRenales().setRenal_FlujoUrinario(renalFlujoUrinario);	
	  sOFASalida.setValoracionSOFAHigadoBilirrubina(higadoBilirrubina);
	  sOFASalida.setValoracionSOFACoagulacionPlaquetaria(coagulacionPlaquetaria);
	  sOFASalida.setValoracionSOFAFrecuenciaRespiratoria(frecuenciaRespiratoria);	 
	  
	}
	
	
	public QuickSOFASalida getQuickSOFASalida() {
		return quickSOFASalida;
	}

	public void setQuickSOFASalida(QuickSOFASalida quickSOFASalida) {
		this.quickSOFASalida = quickSOFASalida;
	}
	
}
 