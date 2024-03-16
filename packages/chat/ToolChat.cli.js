#!/usr/bin/env node
import Tool from './ToolChat.js'
import { getArgsFromCLI } from '@toolx/core/utils.server.js'

const { options, pathIn, pathOut } = getArgsFromCLI();
const tool = new Tool(options, pathIn, pathOut);

tool.run();
