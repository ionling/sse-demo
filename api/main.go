package main

import (
	"fmt"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // デバッグ用
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/events", func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", "text/event-stream")
		c.Writer.Header().Set("Cache-Control", "no-cache")
		c.Writer.Header().Set("Connection", "keep-alive")

		fmt.Fprintf(c.Writer, "retry: 0\n\n")
		c.Writer.Flush()

		messages := []string{
			"(Mike) Hello",
			"(Tom) Hi!",
			"(Mike) How are you?",
			"(Tom) I'm good, thanks! How about you?",
			"(Mike) I'm doing well, thanks for asking.",
			"(Tom) What's your plan for today?",
			"(Mike) I have a meeting in the afternoon.",
			"(Tom) Sounds good. Let's catch up later.",
			"(Mike) Sure, see you later!",
			"(Tom) Bye!",
		}

		for _, msg := range messages {
			// NOTE: This is just for demonstration purposes.
			time.Sleep(2 * time.Second)
			fmt.Fprintf(c.Writer, "data: %s\n\n", msg)
			c.Writer.Flush()
		}

		c.Writer.Write([]byte("event: close\ndata: \n\n"))
		c.Writer.Flush()
	})

	r.Run("0.0.0.0:8080")
}
