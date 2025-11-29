"use client";

import React from 'react'
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'


const markdown = '* Follows [CommonMark](https://commonmark.org)'
export default function Page() {
    createRoot(document.body).render(<Markdown>{markdown}</Markdown>)
}