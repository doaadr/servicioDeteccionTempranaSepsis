package es.tfg.servicios;


import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;

import es.tfg.beans.ParametrosAEvaluarSepsis;
import es.tfg.beans.ResultadoEvaluacionSepsis;

@WebService(name="servicioSepsis", targetNamespace="sepsisService")
public interface IServicioSepsisWS {
	  
	
	@WebResult(name="valorEvaluacionSepsis")
	public ResultadoEvaluacionSepsis evaluarParametrosSepsis(
			@WebParam(name="parametrosAEvaluarSepsis")
			ParametrosAEvaluarSepsis parametrosAEvaluarSepsis
			);	
}
