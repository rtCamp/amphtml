# Bento Access
`bento-access` is similar to the `amp-access` but in addition, it provides `localStorage` feature to store variables in order to minimize unnecessary server requests.

## Configuration
In order to have `bento-access` track variable between server and `localStorage`, configuration is needed. In `bento-access`, a variable is similar to `amp-access` visibility property.

Configuration provides detail about when to send or request server for the variable and to store them into `localStorage`.

### Syntax
```json
{
    "conditional-variable-1": {
        /* Conditional Check       : Check Operator with Value            */,
        /* Default Operation Block : Command Array to Execute             */ ,
        /* True Operation Block    : Command Array to Execute             */ ,
        /* False Operation Block   : Command Array to Execute  [OPTIONAL] */
    },
    "operational-variable-1": {
        /* Operation Block         : Command Array to Execute             */,
    },
    ...
}
```

Here, each variable must have it's own configuration. There are two types of variable configuration:
1. Conditional variable
   - Conditional variable are useful when it is needed to make decision whether to retrieve data from server or not.
   - Configuration for variable are divided into four section:
   1. Conditional Check
      - Verifies `localStorage` variable with provided condition
      - If variable does not found in `localStorage`, it will execute `Default Operation` else based on conditional check, it will execute `True Operation` or `False Operation`.
      - This cannot be used with
   2. Default Operation Block
      - When variable is not available in `localStorage`, it performs operation specified in this section.
      - Supported Operation:
        - "GET" - similar as `authorization` in `amp-access`
          - In context of `bento-access`, it retrieve recent variable state from server
        - "POST" - similar as `pingback` in `amp-access`
          - In context of `bento-access`, it send latest variable data back to server
        - Variable Operation
          - To update `localStorage` variable
        - Function Call Operations
          - To call global function/Action
   3. True Operation Block
      - Similar to `Default Operation Block` but only executes when `Conditional Check` returns true.
   4. False Operation Block
      - Similar to `Default Operation Block` but only executes when `Conditional Check` returns false.
3. Operational Variable
   - When it is needed to track or count visit, this type of variable configuration is needed.
   - Supported Operation:
     - "increment-by" value of the variable in `localStorage` by specified value
     - "decrement-by" value of the variable in `localStorage` by specified value
     - Sample: `increment-by 1 on page-visit/once-a-day/once-a-week`,

#### Sample: Track `donated` variable
```json
/* Configuration */
{
    "donated": {
        // Conditional Check: Can be read as: donated == true?
        [ "==", "true" ],

        // Default Operation Block: Request "https://myserver.com" with URL Parameter with Newspack_CID from COOKIES 
        //   This block will only be executed if "donated" does not exists in `localStorage`
        [ "GET", "https://myserver.com", "newspack_cid=$(COOKIES:newspack_cid)" ],

        // True Operation Block :  localStorage("donated") == true
        //   DO NOTHING IF DONATED IS ALREADY SET TO TRUE!
        [],

        // False Operation Block :  localStorage("donated") !== true
        //  Request "https://myserver.com" with URL Parameter with Newspack_CID from COOKIES 
        [ "GET", "https://myserver.com", "newspack_cid=$(COOKIES:newspack_cid)" ],
    }
}
```
This sample configuration determines whether to show `donated` section to user or not.

Usage in HTML:
```html
<section bento-access="NOT donated">
  This section is only visible if user has not donated!
</section>
```

Execution sequence (Algorithm):
1. if `donated` exists in `localStorage` goto STEP 4
2. Execute `Default Operation Block`
3. Return
4. if `donated == true` goto STEP 7
5. Execute `False Execution Block`
6. Return
7. Execute `True Execution Block`
8. Return

#### Sample: Track `visitCount`
```json
/* Configuration */
{
    "visitCount": [ "increment-by", 1, "page-visit" ],
    "visitCount": {
        // Conditional Check: Can be read as: visitCount > 10?
        [ ">", "10" ],

        // Default Operation Block
        //   If `visitCount` does not exists in `localStorage`, retrieve existing `visitCount` from the server
        [ "GET", "https://myserver.com", "newspack_cid=$(COOKIES:newspack_cid)" ],

        // True Operation Block :  localStorage("visitCount") > 10
        //   Send `visitCount` to server via POST
        [ "POST", "https://myserver.com", "newspack_cid=$(COOKIES:newspack_cid), visitCount=$(localStorage:visitCount)" ],

        // False Operation Block :  localStorage("donated") !== true
        //   DO NOTHING!
        []
    }
}
```
First configuration increment `visitCount` on each page visit for logged in newspack user.

Second configuration does two things:
1. If `visitCount` does not exists in `localStorage`, it requests server for the latest value
2. If `visitCount > 10`, it `POST` back `visitCount` with respective `newspack_cid` as `POST` body.

Usage in HTML:
```html
<section bento-access="visitCount < 10">
  This section is visible only 10 times per user!
</section>
```

# WIP Data
```
{
    "donated":[
        /* Condition Oprtr */ "==",
        /* Value to Check */ "false",
        /* True Block     */ ["GET", "https://xyz",
                                    "userId = $COOKIE:newspack_cid
                                    &lStorg = $localStorage:newspack_cid"],

        /* False Block    */ ["hide", "nwp-donated-diag"] // OPTIONAL
    ],
    
    "visitCount":[
        /* Operator Fn    */ "auto-increment by 1 | auto-decrement by 1",
        /* Value          */ "on page-visit/once-a-day/once-a-week"
    ],

    "visitCount":[
        /* Condition      */ ">",
        /* Value to Check */ "10",
        /* True Block     */ ["POST", "https://xyz", "visitCount: $localStorage:newspack_cid"]
    ],

    [WIP]
    "date":[
        /* Condition      */ ">",
        /* Value to Check */ "10",
        /* True Block     */ ["GET/POST", "https://xyz", "request parameters", "POST DATA"],
        /* False Block    */ ["GET/POST", "https://xyz", "request parameters", "POST DATA"]
    ]
}

Condition can be nested - in future version:
[
    ["!==", "true"],
    "AND / OR"
    ["<", "5"]
]

True/False Block:
+ They can be nested with multiple execution block using array
----
GET
Req:
["GET", "https://xyz", "userId=?"],

Res:
{
    "donated": true
}
----
POST
Req:
["POST", "https://xyz", "userId=?", "POST DATA IN JSON"],
----
Set/Reset Variables
["visitorCount", "=", "0"],
["visitorCount", "+=", "1"],
["visitorCount", "-=", "10"],
----
Execute External Function to Show/Hide Element
["show/hide", "parameter1", "parameter2"],
["toggleClass", "parameter1", "parameter2"],
```