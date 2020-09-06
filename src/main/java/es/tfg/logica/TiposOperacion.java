package es.tfg.logica;

import java.util.HashMap;
import java.util.Map;

public enum TiposOperacion 
{ 
  MENOR_QUE("<"),
  MAYOR_QUE(">"),
  IGUAL_QUE("=");
  
 private String operacion; 
 private static final Map<String, TiposOperacion> listaOperaciones = new HashMap<>();
 
 static
 {
     for(TiposOperacion tipoOperacion : TiposOperacion.values())
     {
    	 listaOperaciones.put(tipoOperacion.dameOperacion(), tipoOperacion);
     }
 }

 
 TiposOperacion(String _operacion)
 {
   this.operacion = _operacion;	 
 }
 
 public String dameOperacion()
 {
   return operacion;	 
 }
 
 

 public static TiposOperacion dameEnum(String _operacion) 
 {
     return listaOperaciones.get(_operacion);
 }
 
 
}
