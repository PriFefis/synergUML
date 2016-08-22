	var oGrandeJson = []; var objHandled = [];	var myJson = [];
	oGrandeJson['name'];
	oGrandeJson['properties'] = [];

 	//botão salvar da modal configurações atributo
	function adicionaConfig(e) {
	  	console.log("Adicionar configuração ao atributo.");
	  	// console.log(e);
	    //Envia/salva dados do form antes de limpar campos.	
	    var modalAbaBasico = $('#basico').find(".form-group");
	    var modalAbaFormOpt = $('#formOptions').find(".form-group");
	    var modalAbaFormValid = $('#formValidation').find(".form-group");
	    var modalAbaDataTableConfig = $('#dataTableConfig').find(".form-group");
	    var modalAbaTableView = $('#tableView').find(".form-group");
	    var arrayModalConfig = [modalAbaBasico, modalAbaFormOpt, modalAbaFormValid, modalAbaDataTableConfig, modalAbaTableView];
		var modalTitle = $('#modalConfig .modal-title').html().split(": ");
		var collection = modalTitle[0];
		var nameAttr = modalTitle[1];
		// console.log("Atributo: " + nameAttr);
		// oGrandeJson = {'name': collection, 'properties': []};
		oGrandeJson['name'] = collection;
		// oGrandeJson['properties'] = {};
		// oGrandeJson.properties[nameAttr] = {};
		myJson = oGrandeJson['properties'][nameAttr] = {};

		for(let index in arrayModalConfig) {
			var size = arrayModalConfig[index].length;  
			// console.log("size: " + size);
			var str = arrayModalConfig[index].selector;
			var abaW = str.search(" .form-group");
    		var aba = str.substring(1, abaW);
    		if (aba == "basico") {
    			objHandled = myJson;
    		} else {
    			objHandled = myJson[aba] = {};
    		}
			// console.log(aba);           
			var i;
			for(i=0; i<size;i++) {  
				var final = []; var selectValues = [];
				var label = arrayModalConfig[index][i].getElementsByTagName("label")[0].innerHTML;
				// console.log(label);

				if (arrayModalConfig[index][i].getElementsByTagName("input")[0]) {
					var contentInput = arrayModalConfig[index][i].getElementsByTagName("input")[0];
					if (contentInput.type=="radio") { 
						// console.log("É radio!");			 
						var opt = $(arrayModalConfig[index][i]).find('input[type=radio][name='+ contentInput.name +']:checked').val();
						// console.log(opt);   
						objHandled[label] = opt;  					
					} else if (contentInput.type=="checkbox"){
						// console.log("É checkbox!");
						$(arrayModalConfig[index][i]).find('input[type=checkbox][name='+ contentInput.name +']:checked').each(function (j) {
							final[j] = $(this).val();	
						});
						if (final.length>1) {
							objHandled[label] = {};
							for(let k=0; k<final.length;k++) {
								objHandled[label][k] = final[k];
							}
						} else if (final.length==1){
							objHandled[label] = final[0];
						}
						// console.log(final);	

					} else { 
						// console.log("Não é radio e nem checkbox!");
						var inputValue = contentInput.value;
						// console.log(inputValue);
						objHandled[label] = inputValue;
					}				
				} else if (arrayModalConfig[index][i].getElementsByTagName("select")[0]) {
					var contentSelect = arrayModalConfig[index][i].getElementsByTagName("select")[0];
					var idSelect = contentSelect.id;
					// console.log("ID: " + idSelect);
					$('#' + idSelect + ' :selected').each(function(j) {
						selectValues[j] = $(this).val();						
					});

					if (selectValues.length>1) {
						objHandled[label] = {};
						for(let k=0; k<selectValues.length;k++) {
							objHandled[label][k] = selectValues[k];
						}
					} else if (selectValues.length==1) {
						objHandled[label] = selectValues[0];
					}
					// console.log(selectValues);					
				}
			}
			// oGrandeJson.push(objHandled);
		} 
		// arrayX.push(oGrandeJson);
		/********************** PEGAR OS DADOS DO DIAGRAMA ***********************
		 var modelAsText2 = myDiagram.model.toJson();
      	 console.log(modelAsText2);
      	************************************************** **********************/
  //      	var bla = JSON.stringify(oGrandeJson); 
		// var blaJSON = JSON.parse(bla); // transforma a string em objeto
  //     	console.log($("#jsonGeral").val());       	
  //      	$("#jsonGeral").val(blaJSON); 
  //      	var conteudo = $("#jsonGeral").text();
  		var testArray = JSON.parse(JSON.stringify(oGrandeJson));
  		
  		// test.push(testArray);
  		// console.log(test);
  		console.log(oGrandeJson);
  		var bla = JSON.stringify(oGrandeJson);
       	console.log(bla);


       	// printObject(arrayX[0]);

       	//Fechar (esconder) modal.
       	$('#modalConfig').modal('hide'); 
  	}

  	//Ao clicar no botão Salvar da janela do form builder:
  	$('#saveCustomForm').click(
    	function(e) { 
	    	// var bla = window.opener.document.activeElement.tagName;
	    	var bla = window.opener.document.activeElement;
	    	var divId = $(window.opener.document.activeElement).attr("value");
	      	var formAdded = $("#render").val(); 
	      	console.log($("#render").val()); 
	      	var breakForm = formAdded.split("legend>");
	      	var contentFinal = breakForm[2].split('</fieldset>');
	      	var addFormGroup = contentFinal[0].replace(/control-group/g, "form-group");
	      	var addColMd3 = addFormGroup.replace(/class="control-label"/g, 'class="col-md-3 control-label"');
	      	var addColMd8 = addColMd3.replace(/class="controls"/g, 'class="col-md-8"');
	      	var final = addColMd8.replace(/(class="input-)+[^"]+"/, 'class="form-control"');
	      	console.log(final);
	      	//se houver seleção de novos campos, pega conteúdo e insere no formulário da modal
	      	var div = window.opener.document.getElementById(divId);
	    	div.innerHTML = div.innerHTML + final;
	    	window.close();
  		});

	//Ao clicar no botão Adicionar, abre nova janela para configurar novos campos.
	function addFields(event) {
		event.preventDefault();
  		window.open('indexForms.html','modalAddFields', '_blank, directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=990,height=680');  	
	}	