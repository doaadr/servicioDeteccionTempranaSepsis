package excepciones;

import java.util.MissingResourceException;
import java.util.ResourceBundle;
import es.tfg.beans.MensajeError;

public class ExcepcionServicioSepsis extends 	Exception 
									 implements IExcepcionServicioSepsis 
{
  private static final long serialVersionUID = 5238248477373357968L;
  private  		 MensajeError   mensajeError = null;
  private static ResourceBundle ficheroMensajesError;
	
  public ExcepcionServicioSepsis() 
  {  } 
  
  public ExcepcionServicioSepsis(String codigoError)
  {
    super();
    recuperarFicheroMensajesError();
    mensajeError = new MensajeError();
    this.getMensajeError().setCodigoError(codigoError);
    asignarDescripcionError();
  }
     
   
   private void asignarDescripcionError()
   {
     String mensajeError = null;
     try
     { 
       mensajeError = ficheroMensajesError.getString(this.getMensajeError().getCodigoError());
     }
     catch(NullPointerException npe) 
     {
       mensajeError = ficheroMensajesError.getString(ERROR_DESCONOCIDO); 	  
     }
     catch(MissingResourceException mres) 
     {
       mensajeError = ficheroMensajesError.getString(ERROR_DESCONOCIDO); 	  
     }
     catch(ClassCastException cce) 
     {
       mensajeError = ficheroMensajesError.getString(ERROR_DESCONOCIDO); 	  
     }
     
     this.getMensajeError().setDescripcionError(mensajeError);
   
   }  
   
    
   private ResourceBundle recuperarFicheroMensajesError()
   {
	  try
	  {
		if(ficheroMensajesError == null)
		{
		  ficheroMensajesError = ResourceBundle.getBundle("conf/mensajesError");	
		}
		
	  }catch(Exception ex)
	  { ex.printStackTrace(); } 
	  
	  return ficheroMensajesError;
   }
   
   
    public MensajeError getMensajeError() {
		return mensajeError;
  	}

	public void setMensajeError(MensajeError mensajeError) {
	  this.mensajeError = mensajeError;
	}

	public static ResourceBundle getFicheroMensajesError() 
	{
	  return ficheroMensajesError;
	}

	public static void setFicheroMensajesError(ResourceBundle ficheroMensajesError) 
	{
	  ExcepcionServicioSepsis.ficheroMensajesError = ficheroMensajesError;
	}
	
}
