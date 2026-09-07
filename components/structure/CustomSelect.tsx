"use client"

import { Heading, Portal, Select, createListCollection, Box } from "@chakra-ui/react"
import { ChevronDownIcon } from "lucide-react"
import { useMemo } from "react"

export const CustomSelect = ({
  items,
  placeholder,
  title,
  onchange,
}: {
  onchange: Function
  title: string
  placeholder: string
  items: Array<{ label: string; value: string }>
}) => {
  // Defensive: dedupe by value and drop entries with a missing/empty value,
  // since that's what actually causes the "unique key" warning below.
  const safeItems = useMemo(() => {
    const seen = new Set<string>()
    const result: Array<{ label: string; value: string }> = []
    for (const item of items ?? []) {
      const value = item?.value
      if (!value) {
        console.warn(`[CustomSelect: "${title}"] dropped item with missing value:`, item)
        continue
      }
      if (seen.has(value)) {
        console.warn(`[CustomSelect: "${title}"] dropped duplicate value "${value}":`, item)
        continue
      }
      seen.add(value)
      result.push(item)
    }
    return result
  }, [items, title])

  return (
    <Select.Root
      onValueChange={(e) => onchange(e.value)}
      collection={createListCollection({ items: safeItems })}
      size="md"
      flex={1}
    >
      <Select.HiddenSelect />

      {/* Label */}
      <Heading
        fontSize={11}
        fontWeight={600}
        color={"gray.400"}
        letterSpacing={"0.08em"}
        textTransform={"uppercase"}
        mb={1.5}
      >
        {title}
      </Heading>

      {/* Trigger */}
      <Select.Control>
        <Select.Trigger
          width={"100%"}
          minH={"42px"}
          px={4}
          bg={"#1a1a24"}
          border={"1.5px solid"}
          borderColor={"whiteAlpha.100"}
          borderRadius={"10px"}
          cursor={"pointer"}
          transition={"all 0.2s"}
          _hover={{
            borderColor: "red.400",
            bg: "#1f1f2e",
          }}
          _focusVisible={{
            outline: "none",
            borderColor: "red.500",
            boxShadow: "0 0 0 3px rgba(239,68,68,0.15)",
          }}
          _open={{
            borderColor: "red.500",
            borderBottomRadius: "0",
            bg: "#1f1f2e",
          }}
        >
          <Select.ValueText
            placeholder={placeholder}
            fontSize={13}
            fontWeight={500}
            color={"white"}
            css={{
              "&[data-placeholder]": {
                color: "var(--chakra-colors-gray-500)",
              },
            }}
          />
          <Select.IndicatorGroup ml={"auto"}>
            <Select.Indicator>
              <ChevronDownIcon
                size={15}
                color="var(--chakra-colors-gray-400)"
              />
            </Select.Indicator>
          </Select.IndicatorGroup>
        </Select.Trigger>
      </Select.Control>

      {/* Dropdown */}
      <Portal>
        <Select.Positioner>
          <Select.Content
            bg={"#1a1a24"}
            border={"1.5px solid"}
            borderColor={"red.500"}
            borderTop={"none"}
            borderBottomRadius={"10px"}
            overflow={"hidden"}
            shadow={"0 8px 32px rgba(0,0,0,0.4)"}
            py={1}
            zIndex={9999}
            css={{
              backdropFilter: "blur(10px)",
            }}
          >
            {safeItems.map((item) => (
              <Select.Item
                item={item}
                key={item.value}
                px={4}
                py={"10px"}
                fontSize={13}
                fontWeight={500}
                color={"gray.300"}
                cursor={"pointer"}
                transition={"all 0.15s"}
                borderRadius={"6px"}
                mx={1}
                _hover={{
                  bg: "whiteAlpha.100",
                  color: "white",
                }}
                _highlighted={{
                  bg: "red.500",
                  color: "white",
                }}
                _selected={{
                  color: "red.400",
                  fontWeight: 600,
                }}
              >
                {item.label}
                <Select.ItemIndicator ml={"auto"}>
                  {/* checkmark when selected */}
                  <Box
                    w={"6px"}
                    h={"6px"}
                    borderRadius={"full"}
                    bg={"red.400"}
                  />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}