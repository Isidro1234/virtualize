"use client"

import { Heading, Portal, Select, createListCollection } from "@chakra-ui/react"


export const CustomSelect = ({items  , placeholder, title, onchange}:{onchange:Function , title:string, placeholder:string , items:Array<{label:string, value:string}>}) => {
  return (
    <Select.Root onValueChange={(e)=>{onchange(e.value)}} collection={createListCollection({items})} minWidth={'70px'} size="md" flex={1}>
      <Select.HiddenSelect />
      <Heading fontSize={12}>{title}</Heading>
      <Select.Control marginTop={-2}>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {items.map((framework) => (
              <Select.Item item={framework} key={framework?.value}>
                {framework?.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})
