import type { IconButtonProps } from "@chakra-ui/react"
import { AspectRatio, Box, Carousel, IconButton, Image } from "@chakra-ui/react"
import { forwardRef } from "react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

export const CustomCarousel = ({ items }: { items: Array<string> }) => {
    const IMAGE_EXTENSIONS = [
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
  'bmp', 'ico', 'tiff', 'tif', 'avif', 'heic', 'heif'
];

const isImage = (url?: string): boolean => {
  if (!url) return false;
  const clean = url.split(/[?#]/)[0];
  const ext = clean.split('.').pop()?.toLowerCase();
  return !!ext && IMAGE_EXTENSIONS.includes(ext);
};
  return (
    <Carousel.Root
      slideCount={items?.length}
      width={'100%'}
      mx="auto"
      gap="4"
      position="relative"
      colorPalette="white"
    >
      <Carousel.Control gap="4" width="full" position="relative">
        <Carousel.PrevTrigger asChild>
          <ActionButton insetStart="4">
            <LuArrowLeft />
          </ActionButton>
        </Carousel.PrevTrigger>

        <Carousel.ItemGroup position="relative" width="full">
          {items?.map((src, index) => (
            <Carousel.Item key={index} index={index}>
             
              {!isImage(src) ?
              <video controls src={src} style={{width:"100%", height:"100%", objectFit:'cover', borderRadius:0}}/>
              :
               <AspectRatio ratio={16 / 9} width="full">
              <Image
                  src={src}
                  alt={`Product ${index + 1}`}
                  objectFit="cover"
                  borderRadius={0}
                />
                </AspectRatio>
                }
                
              
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.NextTrigger asChild>
          <ActionButton insetEnd="4">
            <LuArrowRight />
          </ActionButton>
        </Carousel.NextTrigger>

        <Box position="absolute" bottom="6" width="full">
          <Carousel.Indicators
            transition="width 0.2s ease-in-out"
            transformOrigin="center"
            opacity="0.5"
            boxSize="2"
            _current={{ width: "10", bg: "colorPalette.subtle", opacity: 1 }}
          />
        </Box>
      </Carousel.Control>
    </Carousel.Root>
  )
}

const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function ActionButton(props, ref) {
    return (
      <IconButton
        {...props}
        ref={ref}
        size="xs"
        variant="outline"
        rounded="full"
        position="absolute"
        zIndex="1"
        bg="bg"
      />
    )
  },
)