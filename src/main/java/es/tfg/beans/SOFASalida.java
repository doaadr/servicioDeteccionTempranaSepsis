package es.tfg.beans;

public class SOFASalida
{
   private String 	    valoracionSOFAFrecuenciaRespiratoria;
   private String 	    valoracionSOFACoagulacionPlaquetaria;
   private String 	    valoracionSOFAHigadoBilirrubina;
   private DatosCardio  datosCardio;
   private String 	    valoracionSOFADatosCardio;
   private EstadoMental estadoMental;
   private String 	    valoracionEstadoMental;
   private DatosRenales datosRenales;
   private String		valoracionSOFARenal;
   private String		valoracionDatoExterno;
   private String		valoracionSumaTotalSOFA;
   
   
   public SOFASalida()
   {
	 super();
	 datosCardio  = new DatosCardio();
	 estadoMental = new EstadoMental();
	 datosRenales = new DatosRenales();
   }
   
   
   private void calculoValoracionSumaTotalSOFA()
   {
	 int valorFrecuenciaRespiratoria   = 0;
	 int valorCoagulacionPlaquetaria   = 0;
	 int valorHigadoBilirrubina		   = 0;
	 int valorDatosCardio			   = 0;
	 int valorEstadoMental			   = 0;
	 int valorRenal					   = 0;
	 int valorDatoExterno			   = 0;
	 int contadorVariablesNoInformadas = 0;
	 int sumaSOFA					   = 0;
	 
	 if ( (valoracionSOFAFrecuenciaRespiratoria != null) && (!valoracionSOFAFrecuenciaRespiratoria.equals("0")) )
	 {
	   valorFrecuenciaRespiratoria = Integer.parseInt(valoracionSOFAFrecuenciaRespiratoria);
	   contadorVariablesNoInformadas++;
	 }
	 
	 if ( (valoracionSOFACoagulacionPlaquetaria != null) && (!valoracionSOFACoagulacionPlaquetaria.equals("0")) )
	 {
	   valorCoagulacionPlaquetaria = Integer.parseInt(valoracionSOFACoagulacionPlaquetaria);
	   contadorVariablesNoInformadas++;
	 }
	 
	 if ( (valoracionSOFAHigadoBilirrubina != null) && (!valoracionSOFAHigadoBilirrubina.equals("0")) )
	 {
	   valorHigadoBilirrubina = Integer.parseInt(valoracionSOFAHigadoBilirrubina);
	   contadorVariablesNoInformadas++;
	 }
	 
	 if ( (valoracionSOFADatosCardio != null) && (!valoracionSOFADatosCardio.equals("0")) )
	 {
	   valorDatosCardio = Integer.parseInt(valoracionSOFADatosCardio);
	   contadorVariablesNoInformadas++;
	 }
	 
	 if ( (valoracionEstadoMental != null) && (!valoracionEstadoMental.equals("0")) )
	 {
	   valorEstadoMental = Integer.parseInt(valoracionEstadoMental);
	   contadorVariablesNoInformadas++;
	 }
	 
	 if ( (valoracionSOFARenal != null) && (!valoracionSOFARenal.equals("0")) )
	 {
	   valorRenal = Integer.parseInt(valoracionSOFARenal);
	   contadorVariablesNoInformadas++;
	 }
	 
	 // Si alguna de las variables base de la escala no estan informadas aplicamos la variable externa
	 if (contadorVariablesNoInformadas < 6)
	 {	 
	   valorDatoExterno			 = (valoracionDatoExterno == null) ? contadorVariablesNoInformadas++ : Integer.parseInt(valoracionDatoExterno);
	 }
	 
	 sumaSOFA					 = valorFrecuenciaRespiratoria + valorCoagulacionPlaquetaria + valorHigadoBilirrubina +
			 					   valorDatosCardio	+ valorEstadoMental + valorRenal + valorDatoExterno;
     
     setValoracionSumaTotalSOFA(String.valueOf(sumaSOFA));	 
    	 
   }
   
   
	public String getValoracionSOFADatosCardio() {
		calculoValoracionSumaTotalSOFA();
		return valoracionSOFADatosCardio;
	}

	public void setValoracionSOFADatosCardio(String valoracionSOFADatosCardio) {
	this.valoracionSOFADatosCardio = valoracionSOFADatosCardio;
	}

	public DatosCardio getDatosCardio() {
	return datosCardio;
	}

	public void setDatosCardio(DatosCardio datosCardio) {
	this.datosCardio = datosCardio;
	}

	public String getValoracionSOFAHigadoBilirrubina() {
	return valoracionSOFAHigadoBilirrubina;
	}

	public void setValoracionSOFAHigadoBilirrubina(String valoracionSOFAHigadoBilirrubina) {
	this.valoracionSOFAHigadoBilirrubina = valoracionSOFAHigadoBilirrubina;
	}

	public String getValoracionSOFACoagulacionPlaquetaria() {
	return valoracionSOFACoagulacionPlaquetaria;
	}
	
	public void setValoracionSOFACoagulacionPlaquetaria(String valoracionSOFACoagulacionPlaquetaria) {
	this.valoracionSOFACoagulacionPlaquetaria = valoracionSOFACoagulacionPlaquetaria;
	}

	public String getValoracionSOFAFrecuenciaRespiratoria() {
		return valoracionSOFAFrecuenciaRespiratoria;
	}
	
	public void setValoracionSOFAFrecuenciaRespiratoria(String valoracionSOFAFrecuenciaRespiratoria) {
		this.valoracionSOFAFrecuenciaRespiratoria = valoracionSOFAFrecuenciaRespiratoria;
	}
	
  public EstadoMental getEstadoMental() {
		return estadoMental;
	}

	public void setEstadoMental(EstadoMental estadoMental) {
		this.estadoMental = estadoMental;
	}

	public String getValoracionEstadoMental() {
		return valoracionEstadoMental;
	}

	public void setValoracionEstadoMental(String valoracionEstadoMental) {
		this.valoracionEstadoMental = valoracionEstadoMental;
	}
	
	public DatosRenales getDatosRenales() {
		return datosRenales;
	}

	public void setDatosRenales(DatosRenales datosRenales) {
		this.datosRenales = datosRenales;
	}

	public String getValoracionSOFARenal() {
		return valoracionSOFARenal;
	}

	public void setValoracionSOFARenal(String valoracionSOFARenal) {
		this.valoracionSOFARenal = valoracionSOFARenal;
	}
		
	
    public String getValoracionSumaTotalSOFA() {
		return valoracionSumaTotalSOFA;
	}

	public void setValoracionSumaTotalSOFA(String valoracionSumaTotalSOFA) {
		this.valoracionSumaTotalSOFA = valoracionSumaTotalSOFA;
	}
	
	public String getValoracionDatoExterno() {
		return valoracionDatoExterno;
	}


	public void setValoracionDatoExterno(String valoracionDatoExterno) {
		this.valoracionDatoExterno = valoracionDatoExterno;
	}
	
}
