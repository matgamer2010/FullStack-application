package main

import (
	"structs/models"
	"github.com/gin-gonic/gin"
	"strconv"
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
	for _,p := range objetcts{
		if p.ID == id {
			c.JSON(200, p)
			return
		}
	}
	c.JSON(404, gin.H{
		"message":"Content not Found"
	})
}