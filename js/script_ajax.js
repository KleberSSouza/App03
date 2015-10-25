      function GravaBanco() {
        obj = document.getElementById("FGV_form");
        var postdata = "";
        postdata = postdata + "Tabela=DIRETOR_CP";
        postdata = postdata + "&ChaveNome=IDENTIFICADOR_D";
        postdata = postdata + "&ChaveValor=<%=FM_ID%>";
        postdata = postdata + "&User=<%=FM_User%>";

        for (var i = 0; i < obj.elements.length; i++)
        {
            if (obj.elements[i].name.substr(0, 2) == "nm") {
                if (i == 0 || (i > 0 && obj.elements[i].name != obj.elements[i-1].name)) {
                    campo = obj.elements[i];
                    if (campo != null) { 
                        if (campo.type == "radio") {
                            radios = obj.elements[campo.name];
                            val = 0;
                            for (var j=0, len=radios.length; j<len; j++) {
                                if ( radios[j].checked ) { // radio checked?
                                    val = j + 1; // if so, hold its value in val
                                    break; // and break out of for loop
                                }
                            }
                            postdata = postdata + "&" + campo.name + "=" + val; 
                        }
                        else {
                            if (campo.type == "checkbox") {                                
                                postdata = postdata + "&" + campo.name + "=" + (campo.checked ? 1 : 0); 
                            } 
                            else {
                                postdata = postdata + "&" + campo.name + "=" + campo.value; 
                            }
                        }
                    }
                }
            }
        }
//alert(postdata);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.beforeSend = function(jqXHR) {
            jqXHR.overrideMimeType('text/html; charset=iso-8859-1');
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var retorno  = [];
                var parmitem = [];

                retorno = xmlhttp.responseText.split('&');
//alert(retorno);
            }
        }
        xmlhttp.open("POST", "GravaBanco.asp", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=iso-8859-1");
        xmlhttp.setRequestHeader("Content-length", postdata.length);
        xmlhttp.send(postdata);
      }
