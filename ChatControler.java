import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(@RequestParam("file") MultipartFile file) throws IOException {
        // Process the uploaded document and store its embeddings in the vector database
        documentService.processAndStoreDocument(file);
        return ResponseEntity.ok("Document uploaded and processed successfully.");
    }

    @PostMapping("/chat")
    public ResponseEntity<String> chat(@RequestBody String query) {
        // Generate response based on user query
        String response = documentService.generateResponse(query);
        return ResponseEntity.ok(response);
    }
}
