import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link as NavLink,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  Center,
  MenuList,
  MenuDivider,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from '@couragames/ui';

export function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { user, logout } = useContext(UserContext);

  return (
    <Box zIndex={-1}>
      <Flex
        bg={'rgba(60,60,60,0.2)'}
        backdropFilter={'auto'}
        backdropBlur={'10px'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'80px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link href={'/'}>
            <Text
              fontSize={'3xl'}
              fontWeight={'bold'}
              fontFamily={'Source Sans Prop, sans-serif'}
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              color={useColorModeValue('white', 'white')}
              cursor={'pointer'}
            >
              <a>Coura</a>
            </Text>
          </Link>

          <Link href={'/'}>
            <Text
              fontSize={'3xl'}
              fontWeight={'bold'}
              fontStyle={'italic'}
              fontFamily={'Source Sans Prop, sans-serif'}
              textAlign={useBreakpointValue({
                base: 'center',
                md: 'left',
              })}
              color={'#222222'}
              cursor={'pointer'}
            >
              <a>Games</a>
            </Text>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        {user ? (
          <Box zIndex={-1}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  name={user.username}
                  src={user.avatarUrl ?? ''}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    name={user.username}
                    src={user.avatarUrl ?? ''}
                  />
                </Center>
                <br />
                <Center>
                  <p>{user.username}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Profile</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            <Link href={'/login'}>
              <Button fontSize={'sm'} fontWeight={400} variant={'link'}>
                Sign In
              </Button>
            </Link>

            <Link href={'/signup'}>
              <Button
                // as={Link}
                // to={'/signup'}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'blue.400'}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4} alignItems={'center'}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <NavLink
            p={2}
            as={Link}
            href={navItem.href}
            fontSize={'sm'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            <a>{navItem.label}</a>
          </NavLink>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        // as={Link}
        // to={href}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <NavLink key={child.label} py={2} as={Link} href={child.href}>
                <a>{child.label}</a>
              </NavLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
    children: [
      {
        label: 'Popular',
        subLabel: 'List of top played clashes.',
        href: '/',
      },
      {
        label: 'Random',
        subLabel: 'Open up a random game.',
        href: '/explore',
      },
    ],
  },
  {
    label: 'Stats',
    href: '/stats',
  },
];
