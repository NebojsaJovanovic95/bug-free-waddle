import * as React from "react"
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import KanbanBoard from "./components/KanbanBoard"

export const App = () => (
  <ChakraProvider theme={theme}>
    
    <Box>
      <KanbanBoard/>
    </Box>
  </ChakraProvider>
)
