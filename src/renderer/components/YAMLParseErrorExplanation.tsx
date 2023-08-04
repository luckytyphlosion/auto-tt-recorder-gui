import React from "react";

export function YAMLParseErrorExplanation() {
  return (
    <div>
      <p>Errors occurred while reading in the template file. The errors are listed below, but the error descriptions will likely not be useful to you.</p>
      <p><strong>If this occurred from importing an unmodified exported template, that is an error in the program and not your fault. Please contact the developer.</strong></p>
      <p>Otherwise, here are some general pointers:</p>
      <ul>
        <li>Read the documentation at <em>https://github.com/luckytyphlosion/auto-tt-recorder/blob/master/docs/DOCS.md</em> to understand how to write configs.</li>
        <li>Make sure your command names are at the start of the line, without any spaces before the command name. Command names may also only be on one line.</li>
        <li>Do not include any duplicate commands.</li>
        <li>Ensure that there are no missing closing quotes, e.g.</li>
        <pre>
          <code>
            track-name: "Desert Fort
          </code>
        </pre>
        <li>Your config should only contain command names or comments. Comments are lines starting with `#`, where you can add in notes after the `#`.</li>
        <ul>
          <li>For example, <code>I LOVE MKW</code> would cause an error in the following config, because it is not a command name.</li>
          <pre>
            <code>
              track-name: Desert Fort
              I LOVE MKW
              input-display: auto
            </code>
          </pre>
        </ul>
        <li>If you are still unsure, use one of the configs from the non-GUI release, or create a config by exporting it.</li>
      </ul>
    </div>
  )
}
