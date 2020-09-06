package es.tfg.logica;

import es.tfg.beans.ParametrosAEvaluarSepsis;
import es.tfg.beans.QuickSOFAEntrada;
import es.tfg.beans.ResultadoEvaluacionSepsis;
import es.tfg.beans.SOFAEntrada;
import excepciones.ExcepcionServicioSepsis;

public class Mapeos 
{
 
 
  public static SOFAEntrada mapearDatosSOFA(ParametrosAEvaluarSepsis parametrosAEvaluarSepsis)
  { 
     SOFAEntrada sOFAEntrada;
	 
     sOFAEntrada = new SOFAEntrada();
     sOFAEntrada.setRespiracion_FrecuenciaRespiratoria(parametrosAEvaluarSepsis.getRespiracion_FrecuenciaRespiratoria());     
     sOFAEntrada.setCoagulacion_Plaqueta(parametrosAEvaluarSepsis.getCoagulacion_Plaqueta());
     sOFAEntrada.setHigado_Bilirrubina(parametrosAEvaluarSepsis.getHigado_Bilirrubina());
     sOFAEntrada.setDatosCardio(parametrosAEvaluarSepsis.getDatosCardio());
     sOFAEntrada.setEstadoMental(parametrosAEvaluarSepsis.getEstadoMental());
     sOFAEntrada.setDatosRenales(parametrosAEvaluarSepsis.getDatosRenales());
     sOFAEntrada.setDatoExterno(parametrosAEvaluarSepsis.getDatoExterno());
     
     return sOFAEntrada;
  }
  
  
  
  public static QuickSOFAEntrada mapearDatosqSOFA(ParametrosAEvaluarSepsis parametrosAEvaluarSepsis)
  {
	  QuickSOFAEntrada quickSOFAEntrada;
	  
	  quickSOFAEntrada = new QuickSOFAEntrada();
	  quickSOFAEntrada.setRespiracion_FrecuenciaRespiratoriaRPM(parametrosAEvaluarSepsis.getQuickSOFA_RPM_FrecuenciaRespiratoria());
	  quickSOFAEntrada.setPresionArterialSistolica(parametrosAEvaluarSepsis.getDatosCardio().getPresionArterialSistolica());
	  quickSOFAEntrada.setEstadoMentalAlterado(parametrosAEvaluarSepsis.getEstadoMental().getEstadoAlterado());
	  
	  return quickSOFAEntrada;
  }
  
  
  public static void mapearMensajeDeError( ExcepcionServicioSepsis ess, 
		  								   ResultadoEvaluacionSepsis resultadoEvaluacionSepsis
		  								 )
  {
   resultadoEvaluacionSepsis.getMensajeError().setCodigoError(ess.getMensajeError().getCodigoError()); 
	resultadoEvaluacionSepsis.getMensajeError().setCodigoError(ess.getMensajeError().getDescripcionError());
  }
  
}
