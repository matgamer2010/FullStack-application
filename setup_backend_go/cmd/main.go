package main

import (
	"github.com/gin-gonic/gin"
	"strconv"
	"versions/models"
	"versions/data"
	"fmt"
)

var objetcts = []models.ClassApi{
	{ID: 1, name: "Message 1"},
}

func main(){
	routes := gin.Default()
	routes.GET("api/", getEndPoint)
	routes.POST("api/", postEndPoint)
	routes.GET("api/:id", getEndPointByID)
		routes.Run()
}		

func getEndPoint(c*gin.Context){
	c.JSON(200,gin.H{
		"Request": objetcts,
	})
}

func postEndPoint(c*gin.Context){
	var postObjetcts models.ClassApi
	if err:= c.ShouldBindJSON(& objetcts); err!=nil{
		c.JSON(400, gin.H{
			"Error": err.Error()
		})
		post = append(objetcts, postObjetcts)
	}

}

func getEndPointByID(c*gin.Context){
	idParam = c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err!=nil{
		c.JSON(400, gin.H{
			"Erro": err.Error()
		return
		})
	}
	for _,p := range objetcts
	{
		if p.ID == id {
			c.JSON(200, p)
			return
		}
	}
	c.JSON(404, gin.H{
		"message":"Content not Found"
	})
}

func loadApi(){
	file,err = os.Open("data/payments.json")
	if err!=nil{
		fmt.Println("Error in Open file: ", err)
	}
	defer file.Close()
	decode := json.NewDecoder(file)
	if err:= os.Decode(&objetcts); err!=nil{
		fmt.Println("Error decoding JSON: ", err)
	}
}

func saveApi(){
	file,err = os.Open("data/payments.json")
	if err!=nil{
		fmt.Println("Error in Open file: ", err)
	}
	defer file.Close()
	encode := os.Encode(file)
	if err:= os.Enconde(objects); err!=nil{
		fmt.Println("Erron encoding JSON: ", err)
	}
}