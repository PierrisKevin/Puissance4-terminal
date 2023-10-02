var readline = require("readline-sync")

class Puissance4{
    constructor(nbLn, nbCol, char=" "){
        this.nbLigne = nbLn;
        this.nbCol = nbCol
        this.char = String(char)
        this.puissance = this.#tabInitializer()
        
        this.player1 = readline.question("Player 1 charachter : ")
        this.player2 = readline.question("Player 2 charachter : ")

        this.#printPuissance(this.puissance)
        this.#play()
        
    }
    #tabInitializer(){
        const tab = []
        for(let i=0;i<this.nbLigne;i++){
            const ligne = []
            for(let j=0;j<this.nbCol;j++) ligne.push(this.char)
            tab.push(ligne)
        }
        return tab
    }
    #printPuissance(tab){
        for(let i=0;i<tab.length;i++){
            let ligne = ""
            for(let j=0;j<tab[i].length;j++){
                if (tab[i][j]=="0") ligne+="| _ "
                else if (tab[i][j]=="1") ligne+="| "+this.player1+" "
                else if (tab[i][j]=="2") ligne+="| "+this.player2+" "
            }
            ligne+="|"
            console.log(ligne)
        }
    }
    
    #play(){
        while (true){
            if (this.#playCase(1)){
                console.log('the player 1 win')
                break
            }
            if (this.#playCase(2)){
                console.log('the player 2 win')
                break
            }
        }
    }

    #playCase(player){
        let choiseCol = -1
        let emptyLine = -1
        while (emptyLine===-1 || choiseCol<=0 || choiseCol>7){
            choiseCol = this.#read()
            emptyLine = this.#isEmptyLine(choiseCol)
        }
        this.puissance[emptyLine][choiseCol-1]=player
        this.#printPuissance(this.puissance)
        return this.#verifyGame(player)
    }

    #read(){
        while (true){
            let data = readline.question("Colomn : ")
            try{
                return parseInt(data)
            }
            catch{
                console.log("Enter an integer please...")
                continue
            }
        }  
    }
    #isEmptyLine(col){
        for(let i=this.nbLigne-1;i>=0;i--){
            if (this.puissance[i][col-1]==0) return i
        }
        return -1
        
    }

    // partie verification de gain 
    
    #verifyGame(player){
        return this.#verifyInCol(player) || this.#verifyInLine(player) || this.#verifyDiagonal(player)
    }

    #verifyInLine(player){
        for(let i=this.nbLigne-1;i>=0;i--){
            for(let j=0;j<this.nbCol-2;j++){
                let val = this.puissance[i].slice(j,j+3).join("")
                if (val==String(player).repeat(3)) return true
            }
        }
        return false
    }
    #verifyInCol(player){
        for(let i=this.nbCol-1;i>=0;i--){
            for(let j=0;j<this.nbLigne-2;j++){
                let val = String(this.puissance[j][i])+String(this.puissance[parseInt(j)+1][i])+String(this.puissance[parseInt(j)+2][i])
                if (val==String(player).repeat(3)) return true
            }
        }
        return false
    }
    #verifyDiagonal(player){
        for(let i=this.nbLigne-1;i>=3;i--){
            for(let j=0;j<this.nbCol;j++){
                let val = `${this.puissance[i][j]}${this.puissance[i-1][parseInt(j)+1]}${this.puissance[i-2][parseInt(j)+2]}`
                let val2 = `${this.puissance[i][j]}${this.puissance[i-1][j-1]}${this.puissance[i-2][j-2]}`
                if (val==String(player).repeat(3) || val2==String(player).repeat(3)) return true
            }
        }
        return false
    }
}

// class usage 
const puissance4 = new Puissance4(6,7, 0)