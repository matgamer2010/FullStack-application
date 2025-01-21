package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"versions/models"
)

var objects []models.ClassApi

func main() {
	loadApi()
	routes := gin.Default()
	routes.GET("api/", getEndPoint)
	routes.POST("api/", postEndPoint)
	routes.GET("api/:id", getEndPointByID)
	routes.Run()
}

func getEndPoint(c *gin.Context) {
	c.JSON(200, gin.H{
		"Request": objects,
	})
}

func postEndPoint(c *gin.Context) {
	var postObject models.ClassApi
	if err := c.ShouldBindJSON(&postObject); err != nil {
		c.JSON(400, gin.H{
			"Error": err.Error(),
		})
		return
	}
	postObject.ID 	= len(objects) + 1
	objects = append(objects, postObject)
	saveApi()
	c.JSON(201, postObject)

}

func getEndPointByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		c.JSON(400, gin.H{
			"Error": err.Error(),
		})
		return
	}
	for _, p := range objects {
		if p.ID == id {
			c.JSON(200, p)
			return
		}
	}
	c.JSON(404, gin.H{
		"message": "Content not found",
	})
}

func loadApi() {
	file, err := os.Open("data/payments.json")
	if err != nil {
		fmt.Println("Error opening file:", err)
		return
	}
	defer file.Close()
	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&objects); err != nil {
		fmt.Println("Error decoding JSON:", err)	
		return
	}
}

func saveApi() {
	file, err := os.Create("data/payments.json")
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	if err := encoder.Encode(objects); err != nil {
		fmt.Println("Error encoding JSON:", err)
	}
}