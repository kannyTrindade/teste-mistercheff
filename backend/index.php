<?php 
require 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['REQUEST_URI'], '/'));

switch ($method) {
    case 'GET':
        if (isset($request[1]) && is_numeric($request[1])) {
            getEmpresa($request[1]);
        } else {
            getEmpresas();
        }
        break;
    case 'POST':
        createEmpresa();
        break;
    default:
        echo json_encode(['error' => 'Invalid Request Method']);
}

function getEmpresas() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM empresas");
    $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($empresas);
}

function getEmpresa($id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM empresas WHERE id = ?");
    $stmt->execute([$id]);
    $empresa = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($empresa);
}

function createEmpresa() {
    global $pdo;

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST["nome"], $_POST["cnpj"], $_POST["email"], $_POST["telefone"], $_POST["cep"], $_POST["rua"], $_POST["numero"],$_POST["complemento"],$_POST["bairro"],$_POST["cidade"],$_POST["estado"], $_FILES["logo"])) {
            
            $nome = $_POST["nome"];
            $cnpj = $_POST["cnpj"];
            $email = $_POST["email"];
            $telefone = $_POST["telefone"];
            $cep = $_POST["cep"];
            $rua = $_POST["rua"];
            $numero = $_POST["numero"];
            $complemento = $_POST["complemento"];
            $bairro = $_POST["bairro"];
            $cidade = $_POST["cidade"];
            $estado = $_POST["estado"];
            $logo = $_FILES["logo"];
    
            // Pasta para salvar imagens
            $uploadDir = "uploads/";
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }
    
            // Nome único para a imagem
            $imagePath = $uploadDir . uniqid() . "_" . basename($logo["name"]);
    
            if (move_uploaded_file($logo["tmp_name"], $imagePath)) {
                try {
                    $stmt = $pdo->prepare("INSERT INTO empresas (nome, cnpj, email, telefone, cep, rua, numero, complemento, bairro, cidade, estado, logo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                    $stmt->execute([
                        $nome,
                        $cnpj,
                        $email,
                        $telefone,
                        $cep,
                        $rua,
                        $numero,
                        $complemento,
                        $bairro,
                        $cidade,
                        $estado,
                        $imagePath
                    ]);
    
                    echo json_encode(["message" => "Empresa cadastrada com sucesso!", "image_url" => $imagePath]);
                } catch (PDOException $e) {
                    echo json_encode(["error" => "Erro ao salvar no banco: " . $e->getMessage()]);
                }
            } else {
                echo json_encode(["error" => "Erro ao salvar a imagem."]);
            }
        } else {
            echo json_encode(["error" => "Dados incompletos!"]);
        }
    } else {
        echo json_encode(["error" => "Método inválido!"]);
    }
    
}
?>