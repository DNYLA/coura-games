import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { UserContext } from '@couragames/ui';

/* eslint-disable-next-line */
export interface SignUpProps {}

// export function SignUp(props: SignUpProps) {
//   return (
//     <>
//       <div>Hi</div>
//     </>
//   );
// }

export function SignUp(props: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const { signup, alertMsg } = useContext(UserContext);

  const handleSignUp = useCallback(
    (username, password) => {
      signup(username, password);
    },
    [signup]
  );

  return (
    <Flex minW={'93%'} flexDir={'column'}>
      {alertMsg.show && (
        <Alert status="error" justifyContent="center">
          <AlertIcon />
          {alertMsg.message}
        </Alert>
      )}
      <Flex minH={'95vh'} align={'center'} justify={'center'} bg={'gray.800'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to share and create clashes.
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'gray.700'}
            boxShadow={'lg'}
            p={8}
            minW={'30vw'}
          >
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </FormControl>
              {/* <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl> */}
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={() => handleSignUp(form.username, form.password)}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link href={'/login'}>
                    <Button
                      fontSize={'md'}
                      color={'blue.500'}
                      fontWeight={400}
                      variant={'link'}
                    >
                      Login
                    </Button>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default SignUp;
