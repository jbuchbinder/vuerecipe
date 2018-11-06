package main

import (
	"log"

	"github.com/jbuchbinder/vuerecipe/actions"
)

func main() {
	app := actions.App()
	log.Fatal(app.Serve())
}
