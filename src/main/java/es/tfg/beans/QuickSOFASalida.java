package es.tfg.beans;

public class QuickSOFASalida
{

  private String valoracionFrecuenciaRespiratoria;
  private String valoracionPresionArterialSistolica;
  private String valoracionEstadoMentalAlterado;
  private String valoracionSumaTotalQuickSOFA;
  private String codigoValoracionQuickSOFA;
  private String descripcionValoracionQuickSOFA;

  
  private Integer calculoValoracionSumaTotalQuickSOFA()
  {
	 int valorFrecuenciaRespiratoria   = 0;
	 int valorPresionArterialSistolica = 0;
	 int valorEstadoMentalAlterado     = 0;
	 int sumaQuickSOFA				   = 0;
	
	 valorFrecuenciaRespiratoria   = (valoracionFrecuenciaRespiratoria == null) ? 0 : Integer.parseInt(valoracionFrecuenciaRespiratoria);
	 valorPresionArterialSistolica = (valoracionPresionArterialSistolica == null) ? 0 : Integer.parseInt(valoracionPresionArterialSistolica);
	 valorEstadoMentalAlterado	   = (valoracionEstadoMentalAlterado == null) ? 0 : Integer.parseInt(valoracionEstadoMentalAlterado);
	 sumaQuickSOFA = valorFrecuenciaRespiratoria + valorPresionArterialSistolica + valorEstadoMentalAlterado;
    
	 return new Integer(sumaQuickSOFA);	 
   	 
  }
  
  public String getValoracionSumaTotalQuickSOFA() 
  { Integer sumaQuickSOFA = null;
  
  	sumaQuickSOFA = calculoValoracionSumaTotalQuickSOFA();  
	setValoracionSumaTotalQuickSOFA(String.valueOf(sumaQuickSOFA));
	return valoracionSumaTotalQuickSOFA;
  }
  
  
  public String getDescripcionValoracionQuickSOFA() 
  { Integer sumaQuickSOFA = null;
  
	sumaQuickSOFA = calculoValoracionSumaTotalQuickSOFA();  
	  
    if (sumaQuickSOFA < 2) descripcionValoracionQuickSOFA = new String("Bajo Riesgo Sepsis");
	  else descripcionValoracionQuickSOFA = new String("Alto Riesgo Sepsis");
    
    return descripcionValoracionQuickSOFA;
  }
  
  public void setValoracionSumaTotalQuickSOFA(String valoracionSumaTotalQuickSOFA) {
	 this.valoracionSumaTotalQuickSOFA = valoracionSumaTotalQuickSOFA; 
  }
  
  public String getValoracionFrecuenciaRespiratoria() {
	return valoracionFrecuenciaRespiratoria;
}
public void setValoracionFrecuenciaRespiratoria(String valoracionFrecuenciaRespiratoria) {
	this.valoracionFrecuenciaRespiratoria = valoracionFrecuenciaRespiratoria;
}
public String getValoracionPresionArterialSistolica() {
	return valoracionPresionArterialSistolica;
}
public void setValoracionPresionArterialSistolica(String valoracionPresionArterialSistolica) {
	this.valoracionPresionArterialSistolica = valoracionPresionArterialSistolica;
}
public String getValoracionEstadoMentalAlterado() {
	return valoracionEstadoMentalAlterado;
}
public void setValoracionEstadoMentalAlterado(String valoracionEstadoMentalAlterado) {
	this.valoracionEstadoMentalAlterado = valoracionEstadoMentalAlterado;
}

public String getCodigoValoracionQuickSOFA() {
	return codigoValoracionQuickSOFA;
}
public void setCodigoValoracionQuickSOFA(String codigoValoracionQuickSOFA) {
	this.codigoValoracionQuickSOFA = codigoValoracionQuickSOFA;
}
public void setDescripcionValoracionQuickSOFA(String descripcionValoracionQuickSOFA) {
	this.descripcionValoracionQuickSOFA = descripcionValoracionQuickSOFA;
}
  
  
}
