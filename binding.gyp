{
  "targets": [
    {
      "target_name": "can_api",
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "conditions": [
        [
          "OS=='win'",
          {
            "sources": ["cppsrc/binding.cpp", "cppsrc/can_api.cpp"],
            "include_dirs": ["<(module_root_dir)/canlib_sdk/include"],
            "libraries": ["<(module_root_dir)/canlib_sdk/lib/canlib32.lib"]
          }
        ]
      ],
      "include_dirs": ["<!@(node -p \"require('node-addon-api').include\")"],
      "dependencies": ["<!(node -p \"require('node-addon-api').gyp\")"],
      "cflags": ["-Wall -Werror -Wno-unused"],
      "cflags_cc": ["-fexceptions"],
      "defines": ["NAPI_CPP_EXCEPTIONS"]
    }
  ]
}
