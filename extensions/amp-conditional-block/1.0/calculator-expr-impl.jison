
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                                         /* skip whitespace */
[0-9]+("."[0-9]+)?\b                        return 'NUMBER'
"*"                                         return '*'
"/"                                         return '/'
"-"                                         return '-'
"+"                                         return '+'
"^"                                         return '^'
"!"                                         return '!'
"%"                                         return '%'
"("                                         return '('
")"                                         return ')'
"PI"                                        return 'PI'
"E"                                         return 'E'
"$COOKIE['"[a-zA-Z_][a-zA-Z0-9_]*"']"       return 'VAL_COOKIE'
"$LOCALSTORAGE['"[a-zA-Z_][a-zA-Z0-9_]*"']" return 'VAL_LOCALSTORAGE'
[a-zA-Z_][a-zA-Z0-9_]*                      return 'NAME'
\'[^\']*\'                                  return 'STRING'
\"[^\"]*\"                                  return 'STRING'
"TRUE"                                      return 'TRUE'
"true"                                      return 'TRUE'
"FALSE"                                     return 'FALSE'
"false"                                     return 'FALSE'
"NULL"                                      return 'NULL'
<<EOF>>                                     return 'EOF'
.                                           return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '!'
%right '%'
%left UMINUS

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { typeof console !== 'undefined' ? console.log($1) : print($1);
          return $1; }
    ;

e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | e '!'
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | VAL_COOKIE
        {
            const cookieKey = yytext.replace("$COOKIE['","").replace("']","");
            var cookieValue = null;

            // Split cookie string and get all individual name=value pairs in an array
            var cookieArr = document.cookie.split(";");
                
            // Loop through the array elements
            for(var i = 0; i < cookieArr.length; i++) {
                var cookiePair = cookieArr[i].split("=");

                // Workaround for cookie value like: var1 = X=10:Y=200:Z=-1
                var tempValue = cookieArr[i].substring(cookieArr[i].indexOf("=") + 1);//.split("=");
                
                // Removing whitespace at the beginning of the cookie name
                // and compare it with the given string
                if(cookieKey == cookiePair[0].trim()) {
                    // Decode the cookie value and return
                    cookieValue = decodeURIComponent(tempValue);
                    break;
                }
            }

            $$ = cookieValue;
        }
    | VAL_LOCALSTORAGE
        {
            const variableKey = yytext.replace("$LOCALSTORAGE['","").replace("']","");
            var keyValue = localStorage.getItem(variableKey);
            $$ = keyValue;
        }
    | NUMBER
        {$$ = Number(yytext);}
    | NAME
        { $$ = yy[yytext]; }
    | TRUE
      {$$ = true;}
    | FALSE
        {$$ = false;}
    | NULL
        {$$ = null;}  
    | STRING
      {$$ = yytext.substring(1, yytext.length - 1);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;