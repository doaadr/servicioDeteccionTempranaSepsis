package es.tfg.beans;


public class ParametrosAEvaluarSepsis 
{	
	private String 	   	 respiracion_FrecuenciaRespiratoria;
	private String 	   	 quickSOFA_RPM_FrecuenciaRespiratoria;
	private String 	   	 coagulacion_Plaqueta;
	private String 	   	 higado_Bilirrubina;
	private DatosCardio  datosCardio;
	private EstadoMental estadoMental;
	private DatosRenales datosRenales;
	private DatoExterno  datoExterno; 
 	  
	public DatoExterno getDatoExterno() {
		return datoExterno;
	}
	public void setDatoExterno(DatoExterno datoExterno) 
	{  
		this.datoExterno = datoExterno;
	}
	public DatosRenales getDatosRenales() {
		return datosRenales;
	}
	public void setDatosRenales(DatosRenales datosRenales) {
		this.datosRenales = datosRenales;
	}
	public String getRespiracion_FrecuenciaRespiratoria() {
		return respiracion_FrecuenciaRespiratoria;
	}
	public void setRespiracion_FrecuenciaRespiratoria(String respiracion_FrecuenciaRespiratoria) {
		this.respiracion_FrecuenciaRespiratoria = respiracion_FrecuenciaRespiratoria;
	}
	public String getCoagulacion_Plaqueta() {
		return coagulacion_Plaqueta;
	}
	public void setCoagulacion_Plaqueta(String coagulacion_Plaqueta) {
		this.coagulacion_Plaqueta = coagulacion_Plaqueta;
	}
	public String getHigado_Bilirrubina() {
		return higado_Bilirrubina;
	}
	public void setHigado_Bilirrubina(String higado_Bilirrubina) {
		this.higado_Bilirrubina = higado_Bilirrubina;
	}
	public DatosCardio getDatosCardio() {
		return datosCardio;
	}
	public void setDatosCardio(DatosCardio datosCardio) {
		this.datosCardio = datosCardio;
	}
	public EstadoMental getEstadoMental() {
		return estadoMental;
	}
	public void setEstadoMental(EstadoMental estadoMental) {
		this.estadoMental = estadoMental;
	}

	public String getQuickSOFA_RPM_FrecuenciaRespiratoria() {
		return quickSOFA_RPM_FrecuenciaRespiratoria;
	}
	public void setQuickSOFA_RPM_FrecuenciaRespiratoria(String quickSOFA_RPM_FrecuenciaRespiratoria) {
		this.quickSOFA_RPM_FrecuenciaRespiratoria = quickSOFA_RPM_FrecuenciaRespiratoria;
	}
	
	
}
