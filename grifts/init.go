package grifts

import (
	"github.com/gobuffalo/buffalo"

	"github.com/jbuchbinder/vuerecipe/actions"
)

func init() {
	buffalo.Grifts(actions.App())
}
