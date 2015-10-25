/*--------------------------------------------------------------------------------------------------

   utfmt002 - Fun‡äes para formata‡Æo do conte£do das tags "<INPUT TYPE=TEXT ... >"
   Alterado para suportar FIREFOX.

   Fun‡äes:
       utfmt002_keyDown()                  - Inibe teclas nÆo desejadas
       utfmt002_commascara(mascara)        - Coloca caracteres de mascara em n£mero
       utfmt002_semmascara()               - Retira caracteres de mascara de n£mero
       utfmt002_semmascara_txt(commascara) - Retira caracteres nÆo num‚ricos (0 a 9)
                                             de texto recebido e retorna resultado.
       utfmt002_commascara_valor(decimais) - Coloca caracteres de mascara em n£mero. 
                                             Leva em considera‡Æo a posi‡Æo da v¡rgula.
       utfmt002_commascara_valor_txt(decimais, semmascara) - Coloca caracteres de mascara em n£mero de 
                                             texto recebido e retorna resultado.
                                             Leva em considera‡Æo a posi‡Æo da v¡rgula.
       utfmt002_semmascara_valor()         - Retira caracteres nÆo num‚ricos (0 a 9) de texto 
                                             recebido e retorna resultado. Mant‚m v¡rgula.
       utfmt002_semmascara_valor_txt(commascara) - Retira caracteres nÆo num‚ricos (0 a 9) de texto 
                                             recebido e retorna resultado. Mant‚m v¡rgula.
       utfmt002_DecimalPonto(valorVirgula) - Troca v¡rgula por ponto em texto com n‚mero sem edi‡Æo.
       utfmt002_DecimalVirgula(valorPonto) - Troca ponto por v¡rgula em texto com n‚mero sem edi‡Æo.

   Vari veis Externas:
       utfmt002_formato - tipo do formato usado pela fun‡Æo "utfmt002_keyDown"

--------------------------------------------------------------------------------------------------*/

var utfmt002_formato = "livre";

/*--------------------------------------------------------------------------------------------------

   Fun‡Æo......: utfmt002_keyDown
   Respons vel.: Kleber
   Data........: 18/11/2003
                 15/08/2007 - altera‡Æo para FIREFOX
   Descri‡Æo...: Inibe teclas nÆo desejadas
   Entrada.....: DownEvents - objeto gerado automaticamente no FIREFOX. NÆo usado no IE.

   Formatos....: num     - apenas n‚meros de 0 a 9
                 numesp  - n‚meros de 0 a 9 mais os caracteres: "," "." "/" "-"
                 alfa    - letras de A a Z
                 alfanum - n‚meros de 0 a 9, letras de A a Z
                 livre   - qualquer caracter

   Vari veis Externas.: utfmt002_formato

   Como usar...: No evento onload do <BODY> fazer a seguinte atribui‡Æo:
                 document.onkeydown = utfmt002_keyDown;
                 Na tag <INPUT> desejada colocar:
                 onKeyDown="utfmt002_formato='xxx';"
                 onde xxx ‚ um dos formatos poss¡veis descritos acima.


--------------------------------------------------------------------------------------------------*/

function utfmt002_keyDown(DownEvents)
{
    var e          = DownEvents || event;
    var tecla      = e.keyCode || e.which;
    var shift      = event.shiftKey;
    var obj        = e.srcElement;
    var PosVirgula = 0;

    //status = tecla;
    if ( tecla == 8 ||     // back space
         tecla == 9 ||     // tabulaçÆo
       ( tecla >= 33 &&    // 33 - pg up   34 - pg down    35 - end    36 - home
         tecla <= 40 ) ||  // 37 a 40 setas
       ( tecla >= 112 &&    // 33 - pg up   34 - pg down    35 - end    36 - home
         tecla <= 123 ) ||  // 37 a 40 setas
         tecla == 46 )     // del
            
        return (true);
    
    if (utfmt002_formato == "valor")
    {
        if ((tecla < 48 || tecla > 57 || shift) &&   // n‚meros de 0 a 9
            (tecla < 96 || tecla > 105) &&  // n‚meros de 0 a 9 - teclado num‚rico da direita
             tecla != 188 && tecla != 110)  // "," 
            return (false);
        if (tecla == 188 || tecla == 110) 
        {
            PosVirgula = obj.value.indexOf(",");
            if (PosVirgula != -1) 
                return (false);
        }
    }
    
   if (utfmt002_formato == "num123")
        if ((tecla < 49 || tecla > 51 || shift) &&   // n‚meros de 1 a 3
            (tecla < 97 || tecla > 99))    // n‚meros de 1 a 3 - teclado num‚rico da direita
            return (false);

   if (utfmt002_formato == "num")
        if ((tecla < 48 || tecla > 57 || shift) &&   // n‚meros de 0 a 9
            (tecla < 96 || tecla > 105))    // n‚meros de 0 a 9 - teclado num‚rico da direita
            return (false);

    if (utfmt002_formato == "numesp")
        if ((tecla < 48 || tecla > 57 || shift) &&   // numeros de 0 a 9
            (tecla < 96 || tecla > 105) &&  // n‚meros de 0 a 9 - teclado num‚rico da direita tecla != 189 &&                 // "-"
            tecla != 190 &&                 // "."
            tecla != 193 &&                 // "/"
            tecla != 188 && tecla != 110)   // ","
                return (false);

    if (utfmt002_formato == "alfa")
        if ((tecla < 65 || tecla > 90) &&   // letras de A a Z
            tecla != 32)                    // " "
                return (false);

    if (utfmt002_formato == "alfanum")
        if ((tecla < 48 || tecla > 57 || shift) &&   // numeros de 0 a 9
            (tecla < 96 || tecla > 105) &&  // n‚meros de 0 a 9 - teclado num‚rico da direita tecla != 189 &&                 // "-"
            (tecla < 65 || tecla > 90) &&   // letras de A a Z
            tecla != 32)                    // " "
                return (false);

    if (utfmt002_formato == "alfanum2")     // ‚ o alfanum sem espa‡os em branco
        if ((tecla < 48 || tecla > 57 || shift) &&   // numeros de 0 a 9
            (tecla < 96 || tecla > 105) &&  // n‚meros de 0 a 9 - teclado num‚rico da direita tecla != 189 &&                 // "-"
            (tecla < 65 || tecla > 90))    // letras de A a Z
                return (false);

    utfmt002_formato = "livre";  /* retorna ao valor default */
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_commascara
   Respons vel.: Kleber
   Data........: 18/11/2003
                 15/08/2007 - altera‡Æo para FIREFOX
   Descri‡Æo...: Coloca caracteres de mascara em n£mero
   Entrada.....: obj     - objeto Text onde ser  colocada a m scara.
                 mascara - mascara com caracteres.

   Como usar...: Na tag <INPUT> desejada colocar:
                 onblur="utfmt002_commascara(xxx);"
                 onde xxx ‚ uma sequencia de caracteres que compäem a m scara.

   Notas:
   1) Na m scara o caracter "9" ou ">" ‚ substituido pelo algarismo correspondente no n£mero da
      direita para esquerda.
   2) Qualquer outro caracter ‚ inserido como literal da m scara.
   3) Os ">" mais a esquerda que nÆo tiverem algarismos correspondentes no n£mero serÆo
      preenchidos com zeros.
   4) Campos com m scara = "99/99/9999" serÆo interpretados como data e se o s‚culo nÆo for
      informado ele ser  automaticamente preenchido por '20' se ano menor que 50 ou em caso
      contr rio com '19'.

--------------------------------------------------------------------------------------------------*/

function utfmt002_commascara(obj, mascara)
{
    var Contador2 = obj.value.length-1;
    var valtemp   = "";
    var ano       = 0;

    if (mascara == "99/99/9999")               // data
    {
        if (Contador2 == 5)                    // se tamanho = 6 inclui s‚culo
        {
            ano = obj.value.substr(4, 2);      // pega ano
            if (ano < 50)
            {
                obj.value = obj.value.substr(0, 4) + "20" + obj.value.substr(4, 2)
            }
            else
            {
                obj.value = obj.value.substr(0, 4) + "19" + obj.value.substr(4, 2)
            }
            Contador2 = 7;
        }

    }

    for (var Contador=mascara.length-1; Contador>=0; Contador--)
    {
        if ((mascara.substr(Contador, 1) == "9") || (mascara.substr(Contador, 1) == ">"))
        {
            if (Contador2 >= 0)
            {
                valtemp = obj.value.substr(Contador2, 1) + valtemp;
                Contador2--;
            }
            else
            {
                valtemp = "0" + valtemp;
            }
        }
        else
        {
            valtemp = mascara.substr(Contador, 1) + valtemp;
        }
    }

    for (var Contador=0; Contador<mascara.length; Contador++)
    {
        if (((mascara.substr(Contador, 1) == ">") && (valtemp.substr(Contador, 1) != "0")) ||
             (mascara.substr(Contador, 1) == "9"))
        {
             valtemp = valtemp.substr(Contador);
             Contador = mascara.length
        }
    }
    obj.value = valtemp;
    utfmt002_formato = "livre";
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_semmascara
   Respons vel.: Kleber
   Data........: 18/11/2003
                 15/08/2007 - altera‡Æo para FIREFOX
   Descri‡Æo...: Retira caracteres nÆo num‚ricos (0 a 9)
   Entrada.....: obj     - objeto Text de onde ser  retirada a m scara.

   Como usar...: Na tag <INPUT> desejada colocar:
                 onfocus="utfmt002_semmascara();"

--------------------------------------------------------------------------------------------------*/

function utfmt002_semmascara(obj)
{
    obj.value = utfmt002_semmascara_txt(obj.value);
    obj.select();
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_semmascara_txt
   Respons vel.: Kleber
   Data........: 18/11/2003
   Descri‡Æo...: Retira caracteres nÆo num‚ricos (0 a 9) - de texto recebido e retorna resultado
   Entrada.....: commascara - texto com mascara
   Sa¡da.......: Texto com apenas a parte num‚rica.

--------------------------------------------------------------------------------------------------*/

function utfmt002_semmascara_txt(commascara)
{
    var valtemp   = "";

    for (var Contador=commascara.length; Contador>=0; Contador--)
    {
        if (commascara.substr(Contador, 1) >= "0" && commascara.substr(Contador, 1) <= "9")
        {
            valtemp = commascara.substr(Contador, 1) + valtemp;
        }
    }

    return (valtemp);
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_commascara_valor
   Respons vel.: Kleber
   Data........: 26/02/2004
                 15/08/2007 - altera‡Æo para FIREFOX
   Descri‡Æo...: Coloca caracteres de mascara em n£mero - leva em considera‡Æo a posi‡Æo da v¡rgula
   Entrada.....: obj      - objeto Text onde ser  colocada a m scara.
                 decimais - quantidade de algarismos ap¢s a v¡rgula.

   Como usar...: Na tag <INPUT> desejada colocar:
                 onblur="utfmt002_commascara_valor(n);"
                 onde n ‚ a quantidade de algarismos ap¢s a v¡rgula.

--------------------------------------------------------------------------------------------------*/

function utfmt002_commascara_valor(obj, decimais)
{
    obj.value = utfmt002_commascara_valor_txt(decimais, obj.value);
    utfmt002_formato = "livre";
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_commascara_valor_txt
   Respons vel.: Kleber
   Data........: 26/02/2004
   Descri‡Æo...: Coloca caracteres de mascara em n£mero de texto recebido e retorna resultado.
                 Leva em considera‡Æo a posi‡Æo da v¡rgula.
   Entrada.....: decimais   - quantidade de algarismos ap¢s a v¡rgula.
                 semmascara - texto com o n£mero antes da edi‡Æo: apenas algarismos de 0 a 9 e 
                              uma v¡rgula (opcional).
   Sa¡da.......: Valor formatado.

--------------------------------------------------------------------------------------------------*/

function utfmt002_commascara_valor_txt(decimais, semmascara)
{
    var valtemp   = "";
    var PosVirgulaTexto = semmascara.indexOf(","); //pegar posi‡Æo da v¡rgula no texto

    if (PosVirgulaTexto == -1) 
        PosVirgulaTexto = semmascara.length;
    if (PosVirgulaTexto == 0) 
        valtemp   = "0";

    if (PosVirgulaTexto > 3) //coloca pontos
        PosPonto = PosVirgulaTexto % 3;
    else
        PosPonto = -1;

    for (var Contador=0; Contador<PosVirgulaTexto; Contador++)
    {
       if (((Contador % 3) == PosPonto) && Contador > 0)
           valtemp = valtemp + ".";    
        valtemp = valtemp + semmascara.substr(Contador, 1);
    }
      
    valtemp = valtemp + ",";

    for (var Contador=PosVirgulaTexto+1; Contador<=PosVirgulaTexto+decimais; Contador++)
    {
        if (Contador < semmascara.length) 
            valtemp = valtemp + semmascara.substr(Contador, 1);
        else
            valtemp = valtemp + "0";
    }

    //obj.value = "R$ " + valtemp;
    return(valtemp);
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_semmascara_valor
   Respons vel.: Kleber
   Data........: 26/02/2004
                 15/08/2007 - altera‡Æo para FIREFOX
   Descri‡Æo...: Retira caracteres nÆo num‚ricos (0 a 9) - de texto recebido e retorna resultado.
                 Mant‚m v¡rgula.
   Entrada.....: obj     - objeto Text de onde ser  retirada a m scara.

   Como usar...: Na tag <INPUT> desejada colocar:
                 onfocus="utfmt002_semmascara_valor();"

--------------------------------------------------------------------------------------------------*/

function utfmt002_semmascara_valor(obj)
{
    obj.value = utfmt002_semmascara_valor_txt(obj.value);
    obj.select();
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_semmascara_valor_txt
   Respons vel.: Kleber
   Data........: 26/02/2004
   Descri‡Æo...: Retira caracteres nÆo num‚ricos (0 a 9) - de texto recebido e retorna resultado.
                 Mant‚m v¡rgula.
   Entrada.....: commascara - Valor formatado.
   Sa¡da.......: texto com o n‚mero sem edi‡Æo: apenas algarismos de 0 a 9 e uma v¡rgula caso existam
                 casas decimais.
   
--------------------------------------------------------------------------------------------------*/

function utfmt002_semmascara_valor_txt(commascara)
{
    var valtemp   = "";
    var flgVirgula = false;

    var PosVirgulaTexto = commascara.indexOf(","); //pegar posi‡Æo da v¡rgula no texto

    for (var Contador=commascara.length; Contador>=0; Contador--)
    {
        if ((PosVirgulaTexto != -1) && (valtemp == "") && (flgVirgula == false) &&
           ((commascara.substr(Contador, 1) == "0") || (commascara.substr(Contador, 1) == ",")))
        {
            if (commascara.substr(Contador, 1) == ",") 
            {
                flgVirgula = true;
            }
        }
        else
            if ((commascara.substr(Contador, 1) >= "0" && commascara.substr(Contador, 1) <= "9") ||
                (commascara.substr(Contador, 1) == ","))
            {
                valtemp = commascara.substr(Contador, 1) + valtemp;
            }
    }

    return(valtemp);
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_DecimalPonto
   Respons vel.: Kleber
   Data........: 26/02/2004
   Descri‡Æo...: Troca v¡rgula por ponto em texto com n‚mero sem edi‡Æo.
   Entrada.....: valorVirgula - Valor sem edi‡Æo e com a v¡rgula como ponto decimal.
   Sa¡da.......: Valor sem edi‡Æo e com o ponto como ponto decimal.
   
--------------------------------------------------------------------------------------------------*/

function utfmt002_DecimalPonto(valorVirgula)
{
    var ValTemp = utfmt002_semmascara_valor_txt(valorVirgula);

    if (ValTemp.indexOf(",") != -1) 
        ValTemp = ValTemp.substr(0, ValTemp.indexOf(",")) + "." + ValTemp.substr(ValTemp.indexOf(",") + 1);

    return(ValTemp);
}

/*--------------------------------------------------------------------------------------------------

   fun‡Æo......: utfmt002_DecimalVirgula
   Respons vel.: Kleber
   Data........: 26/02/2004
   Descri‡Æo...: Troca ponto por v¡rgula em texto com n‚mero sem edi‡Æo.
   Entrada.....: valorPonto - Valor sem edi‡Æo e com o ponto como ponto decimal.
   Sa¡da.......: Valor sem edi‡Æo e com a v¡rgula como ponto decimal.
   
--------------------------------------------------------------------------------------------------*/

function utfmt002_DecimalVirgula(valorPonto)
{
    var ValTemp = valorPonto.toString();

    if (ValTemp.indexOf(".") != -1) 
        ValTemp = ValTemp.substr(0, ValTemp.indexOf(".")) + "," + ValTemp.substr(ValTemp.indexOf(".") + 1);

    return(ValTemp);
}
