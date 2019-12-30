package fredericsun.ppmtool.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;

@Service
public class ValidationErrorService {
    public ResponseEntity<?> validationErrorService(BindingResult result) {
        if (result.hasErrors()) {
            HashMap<String, String> errorMsg = new HashMap<>();

            for (FieldError error : result.getFieldErrors()) {
                errorMsg.put(error.getField(), error.getDefaultMessage());
            }

            return new ResponseEntity<HashMap<String, String>>(errorMsg, HttpStatus.BAD_REQUEST);
        }
        return null;
    }
}
