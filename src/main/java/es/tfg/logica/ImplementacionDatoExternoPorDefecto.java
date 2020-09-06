package es.tfg.logica;


public class ImplementacionDatoExternoPorDefecto implements IEjecucionObtencionDatoExterno
{
	
	public Integer obtenerDatoExterno(Integer 		 valorDatoExterno,
									  TiposOperacion tipoOperacion,
									  Integer 		 valorLimite)
	{
	  int resultadoValorDatoExterno = 0;
	  
	  
	  if (tipoOperacion == TiposOperacion.MAYOR_QUE)
	  {
	    resultadoValorDatoExterno = (valorDatoExterno > valorLimite) ? 4 : 0;	  
	  }
	  
	  
	  if (tipoOperacion == TiposOperacion.MENOR_QUE)
	  {
		resultadoValorDatoExterno = (valorDatoExterno < valorLimite) ? 4 : 0;   
	  }
	  
	  
	  if (tipoOperacion == TiposOperacion.IGUAL_QUE)
	  {
		resultadoValorDatoExterno = (valorDatoExterno == valorLimite) ? 4 : 0;  
	  }
	  
	  return new Integer(resultadoValorDatoExterno);
	}
	
}
