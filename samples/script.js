$('[data-tt="tooltip"]').tooltip();

function saveModel() {
  var modelAsText = myDiagram.model.toJson();
  var blob = new Blob([modelAsText], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "umlDiagram.json")
};

function loadModel(modelAsText) {
  myDiagram.model = go.Model.fromJson(modelAsText);
  //toastr.options.positionClass = "toast-top-right";
  toastr.options.timeOut = 5000;
  toastr.options.extendedTimeOut = 1000;
  toastr.options.closeButton = true;
  //toastr.options.positionClass = "toast-bottom-center";  
  toastr.options.onclick = null;
  toastr["success"]("Arquivo json carregado com sucesso!");
}

$(document).on("click", "#gerarModelo", function(e){
  e.preventDefault();
  readingFile();
});

function readingFile(){
  //event.preventDefault(); 
  var file = document.getElementById('files').files[0];
  //alert("Arquivo selecionado: " + file.name);
  toastr.options.timeOut = 0;
  toastr.options.extendedTimeOut = 0;
  toastr.options.closeButton = false;
  //toastr.options.positionClass = "toast-bottom-center";

  var $toast = toastr["info"]('Arquivo selecionado: '+file.name+'. <br /><br /><button type="button" id="okButton" class="btn btn-primary">Ok</button>' +
    '&nbsp; &nbsp;<button type="button" id="trocar" class="btn btn-primary">Trocar arquivo</button>');

  if ($toast.find('#okButton').length) {
    $toast.delegate('#okButton', 'click', function () {
      console.log("Você clicou no botão ok!");
      $toast.remove();
      if (file && validaFile(file.name)) {
        getAsText(file);
      }
    });
  } 
  if ($toast.find('#trocar').length) {
    $toast.delegate('#trocar', 'click', function () {
      console.log("Você clicou no botão Trocar arquivo!");
    });
  }    
}

function validaFile (nomeFile) {
  var res = nomeFile.split(".");
  if (res[1]=="json") {
    //console.log("Arquivo tem formato json.");
    return true;
  } else {
    toastr.options.timeOut = 5000;
    toastr.options.extendedTimeOut = 1000;
    toastr.options.closeButton = true;
    //toastr.options.positionClass = "toast-top-full-width"; 
    toastr.options.onclick = null;
    toastr["error"]("Por favor, selecione um arquivo de extensão json.", "Formato inválido!");
    return false;
  }
}

function getAsText(readFile) {
  var reader = new FileReader;
  reader.readAsText(readFile, "UTF-8");
  //reader.onprogress = updateProgress;
  reader.onload = loaded;
  reader.onerror = errorHandler;
}

function loaded(evt) {
  // Obtain the read file data
  var fileString = evt.target.result;
  loadModel(fileString);
}

function errorHandler(evt) {
  if(evt.target.error.name == "NotReadableError") {
    console.log("ERROR");
    // The file could not be read
  }
}

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}




